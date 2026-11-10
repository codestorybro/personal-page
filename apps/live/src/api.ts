import { useCallback, useEffect, useRef, useState } from "react";
import type { Choice, Snapshot } from "../shared/protocol";
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(typeof init?.body === "string"
        ? { "Content-Type": "application/json" }
        : {}),
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(body.error ?? `Błąd ${response.status}.`);
  }
  return response.json() as Promise<T>;
}
export function useLive(id: string, role: "presenter" | "participant") {
  const [state, setState] = useState<Snapshot | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<Choice | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const stateRef = useRef<Snapshot | null>(null);
  const pendingVote = useRef<{
    type: "vote";
    questionId: string;
    round: number;
    choice: Choice;
    seq: number;
  } | null>(null);
  const seq = useRef(0);
  const storageKey = `live-pending-${id}`;
  const apply = useCallback(
    (next: Snapshot) => {
      if (stateRef.current && next.revision < stateRef.current.revision) return;
      stateRef.current = next;
      setState(next);
      seq.current = Math.max(seq.current, next.vote?.seq ?? 0);
      const waiting = pendingVote.current;
      if (
        waiting &&
        (next.active?.id !== waiting.questionId ||
          next.active?.round !== (waiting.round ?? 1) ||
          (next.vote && next.vote.seq >= waiting.seq))
      ) {
        if (
          next.active?.id !== waiting.questionId ||
          next.active?.round !== (waiting.round ?? 1)
        )
          setError(
            "Poprzednia runda została zakończona. Liczą się tylko potwierdzone głosy.",
          );
        pendingVote.current = null;
        setPending(null);
        sessionStorage.removeItem(storageKey);
      }
    },
    [storageKey],
  );
  useEffect(() => {
    let disposed = false;
    let retry: ReturnType<typeof setTimeout>;
    let heartbeat: ReturnType<typeof setInterval>;
    let voteRetry: ReturnType<typeof setTimeout>;
    let attempts = 0;
    let lastPong = Date.now();
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        pendingVote.current = JSON.parse(stored);
        setPending(pendingVote.current?.choice ?? null);
        seq.current = pendingVote.current?.seq ?? 0;
      }
    } catch {
      sessionStorage.removeItem(storageKey);
    }
    const connect = async () => {
      try {
        if (role === "participant")
          apply(
            await api<Snapshot>(`/api/sessions/${id}/join`, { method: "POST" }),
          );
        else apply(await api<Snapshot>(`/api/presenter/sessions/${id}`));
        if (disposed) return;
        const url = new URL(
          `/api/${role === "presenter" ? "presenter/sessions" : "sessions"}/${id}/socket`,
          location.origin,
        );
        url.protocol = location.protocol === "https:" ? "wss:" : "ws:";
        const ws = new WebSocket(url);
        socket.current = ws;
        ws.onopen = () => {
          attempts = 0;
          lastPong = Date.now();
          setConnected(true);
          setError("");
        };
        ws.onmessage = (event) => {
          lastPong = Date.now();
          if (event.data === "pong") return;
          const data = JSON.parse(event.data);
          if (data.type === "state") {
            apply(data);
            if (pendingVote.current && ws.readyState === WebSocket.OPEN)
              ws.send(JSON.stringify(pendingVote.current));
          } else if (data.type === "ack") {
            if (
              stateRef.current?.active?.id !== data.questionId ||
              stateRef.current?.active?.round !== (data.round ?? 1)
            )
              return;
            seq.current = Math.max(seq.current, data.seq);
            const current = stateRef.current;
            if (current && current.active?.id === data.questionId) {
              const next = {
                ...current,
                vote: { choice: data.choice, seq: data.seq },
              };
              stateRef.current = next;
              setState(next);
            }
            if (pendingVote.current && data.seq >= pendingVote.current.seq) {
              pendingVote.current = null;
              setPending(null);
              sessionStorage.removeItem(storageKey);
            }
            setError("");
          } else if (data.type === "error") {
            if (
              data.questionId &&
              (stateRef.current?.active?.id !== data.questionId ||
                stateRef.current?.active?.round !== data.round)
            )
              return;
            if (data.code === 429 && pendingVote.current) {
              clearTimeout(voteRetry);
              voteRetry = setTimeout(() => {
                if (pendingVote.current && ws.readyState === WebSocket.OPEN)
                  ws.send(JSON.stringify(pendingVote.current));
              }, 600);
            } else {
              setError(data.message);
              pendingVote.current = null;
              setPending(null);
              sessionStorage.removeItem(storageKey);
            }
          }
        };
        ws.onclose = (event) => {
          setConnected(false);
          if (disposed) return;
          if (event.code === 4004) {
            setState(null);
            stateRef.current = null;
            setError("Sesja została usunięta przez prezentera.");
            return;
          }
          if (event.code === 4000) {
            setError(
              "Połączenie zastąpiono w innej karcie. Odśwież, aby wrócić.",
            );
            return;
          }
          if (event.code === 4001 && role === "presenter") {
            setError(
              "Logowanie wygasło. Odśwież stronę, aby zalogować się ponownie.",
            );
            return;
          }
          retry = setTimeout(
            connect,
            Math.min(1000 * 2 ** attempts++, 15000) + Math.random() * 500,
          );
        };
        ws.onerror = () => ws.close();
      } catch (e) {
        if (disposed) return;
        setError(e instanceof Error ? e.message : "Brak połączenia.");
        setConnected(false);
        retry = setTimeout(connect, 10000);
      }
    };
    void connect();
    heartbeat = setInterval(() => {
      const ws = socket.current;
      if (ws?.readyState === WebSocket.OPEN) {
        if (Date.now() - lastPong > 60000) ws.close();
        else {
          ws.send("ping");
          if (pendingVote.current) ws.send(JSON.stringify(pendingVote.current));
        }
      }
    }, 20000);
    const online = () => {
      if (socket.current?.readyState === WebSocket.OPEN)
        socket.current.send("ping");
    };
    const leave = () => socket.current?.close(1000, "Opuszczono stronę.");
    const restore = (event: PageTransitionEvent) => {
      if (event.persisted) location.reload();
    };
    window.addEventListener("pagehide", leave);
    window.addEventListener("pageshow", restore);
    window.addEventListener("online", online);
    return () => {
      disposed = true;
      clearTimeout(retry);
      clearTimeout(voteRetry);
      clearInterval(heartbeat);
      socket.current?.close();
      window.removeEventListener("online", online);
      window.removeEventListener("pagehide", leave);
      window.removeEventListener("pageshow", restore);
    };
  }, [id, role, apply, storageKey]);
  const vote = (choice: Choice) => {
    const active = stateRef.current?.active;
    const ws = socket.current;
    if (!active || ws?.readyState !== WebSocket.OPEN || pendingVote.current)
      return;
    const message = {
      type: "vote" as const,
      questionId: active.id,
      round: active.round,
      choice,
      seq: ++seq.current,
    };
    pendingVote.current = message;
    setPending(choice);
    setError("");
    sessionStorage.setItem(storageKey, JSON.stringify(message));
    ws.send(JSON.stringify(message));
  };
  return { state, connected, error, pending, vote, apply };
}
