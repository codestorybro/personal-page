# CodeStoryBro Live

Osobna aplikacja: React + Vite, Cloudflare Workers **Free**, Durable Objects z SQLite, prywatne Workers KV dla PDF-ów i Cloudflare Access Free dla prezentera. Główna strona Next.js pozostaje w katalogu głównym repozytorium i na Vercel.

Pełna instrukcja publikacji: [DEPLOYMENT.md](./DEPLOYMENT.md). Nie wykonano wdrożenia, zmian DNS ani utworzenia zasobów Cloudflare.

## Limity aplikacji i zapas

Źródło limitów używanych przez frontend i backend: `shared/protocol.ts`, obiekt `LIMITS`.

| Element | Limit aplikacji | Przydział platformy / wyjaśnienie |
| --- | --- | --- |
| Uczestnicy online | 1000 / sesję | Testowane lokalnie; połączenia tej samej przeglądarki liczą się raz |
| Pytania | 5 / sesję | Ręczne ponowne otwarcie tworzy nową rundę |
| Oryginalny i udostępniony PDF | 20 MB każdy | KV dopuszcza 25 MiB; limit obejmuje też gotowy eksport |
| Wszystkie PDF-y | 750 MB | KV Free: 1 GB współdzielony przez konto; rezerwacje uwzględniają też porzucone przesyłania |
| Archiwum | 100 sesji | Oryginał i kopia publiczna zajmują osobne miejsce |
| Slajdy PDF | 2000 | Pytania są dodatkowymi pozycjami prezentacji |
| Połączenia | 2 / przeglądarkę, 4 prezentera | Telefon i projektor mogą używać tego samego konta w różnych sieciach |

Nie używamy R2 ani usług z płatnymi nadwyżkami. Workers, DO i KV muszą pozostać na Free. Po wyczerpaniu limitu platformy operacje są blokowane, również głosowanie, jeżeli wyczerpie się jego przydział. Limity dzienne są wspólne dla konta: inne aplikacje mogą zużyć zapas. Limity aplikacji nie są miernikiem wszystkich dziennych operacji platformy. Nie przełączaj konta na Workers Paid i nie aktywuj R2 w ramach tego wdrożenia.

Darmowe KV: 100 tys. odczytów i 1000 zapisów/usunięć dziennie, 1 GB łącznie. DO SQLite: 100 tys. zapisanych wierszy dziennie, 5 GB danych; indeksy i operacje pomocnicze również zużywają przydział. Przyjęcie głosu aktualizuje odpowiedź, wynik i metadane. Zmiany odpowiedzi i kolejne rundy zwiększają zużycie. [KV pricing](https://developers.cloudflare.com/kv/platform/pricing/), [DO pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/), [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

## Uruchomienie lokalne

Node.js 22.12+ i Yarn Classic. Konto Cloudflare nie jest wymagane.

```sh
cd apps/live
yarn install --frozen-lockfile
yarn dev
```

Panel: http://127.0.0.1:8787/presenter. Tylko środowisko `local` dopuszcza prezentera bez logowania na loopback. Nie publikuj go i nie udostępniaj przez tunel. `yarn dev` buduje frontend przy starcie; po zmianie frontendu użyj `yarn build` lub Vite z proxy: `yarn dev:web`.

SQLite i KV są w ignorowanym `.wrangler/`. QR z loopback działa na tym samym komputerze; test telefonu wymaga publicznego HTTPS z prawdziwym Access.

### Zachowanie starszych lokalnych danych R2

Jeśli korzystałeś z lokalnej wersji sprzed KV, zatrzymaj lokalny serwer, uruchom poniższe polecenie i uruchom go ponownie:

```sh
yarn migrate:local-pdfs
```

Skrypt korzysta wyłącznie z lokalnego emulatora, kopiuje stare PDF-y do lokalnego KV, nie usuwa źródeł ani sesji SQLite i można go ponowić. Pliki powyżej 20 MB zatrzymują migrację; oryginały pozostają zachowane. Nie jest to migracja konta chmurowego. Dwa istniejące pliki z lokalnego środowiska zostały skopiowane podczas tej zmiany.

## Przebieg prezentacji

1. Utwórz sesję, wgraj PDF i zapisz do 5 pytań A/B po wybranych slajdach.
2. Otwórz ekran projektora w drugim oknie. Na telefonie otwórz tę samą sesję w Studio; obydwa urządzenia logują się jako dozwolony prezenter.
3. Uczestnicy dołączają jednym QR `/s/:id`, bez kont. Serwer wydaje losowe UUID w osobnym cookie sesji (HttpOnly, SameSite=Strict, Secure na HTTPS, 7 dni). Inna przeglądarka / incognito / usunięcie cookies daje nową tożsamość. Tożsamość nie jest weryfikacją fizycznej osoby.
4. Przejście dalej po przypisanym slajdzie otwiera pytanie. Następne „dalej” zamyka głosowanie; kolejne przechodzi do następnej pozycji. Uczestnik może zmieniać odpowiedź do zamknięcia. Liczy się ostatni głos potwierdzony przez serwer.
5. Pytania pozostają w osi prezentacji. Cofanie nie zeruje wyników. „Pokaż pytanie na ekranie” przywołuje istniejący stan, a „Uruchom ponownie od zera” tworzy nową rundę, zachowując historię poprzednich w archiwum i CSV.
6. Po zakończeniu sesji wybierz „Udostępnij”. Przeglądarka przygotuje PDF z oryginalnymi stronami i wstawionymi pytaniami (1920×1080, ostatnie procentowe wyniki, bez liczników głosów). Dopiero wtedy prezentacja trafia do publicznego Stage. „Wycofaj” natychmiast blokuje pobieranie przez sprawdzenie SQLite; samo usuwanie KV może propagować później.
7. Usunięcie zakończonej sesji lub szkicu usuwa śledzone pliki, głosy, historię, uczestników i wpis w archiwum. Aktywną sesję trzeba najpierw zakończyć. Nieudane usuwanie można ponowić. Usunięcie samego PDF-u nie usuwa wyników; wcześniej wycofaj udostępnienie.

KV ma eventual consistency: nowy plik może być widoczny w innej lokalizacji z opóźnieniem około minuty lub dłuższym. Podgląd ponawia odpowiedzi 503 co 5 s, do 15 razy; pobieranie można ponowić. Pliki mają niepowtarzalne klucze. Autoryzacja, udostępnienie, wycofanie i lista plików do usunięcia są w spójnym DO, nie w KV. Brak publicznego endpointu z kluczem KV. Obsługujemy strumieniowe HTTP Range bez wczytywania całego pliku do pamięci aplikacji.

## Sterowanie i prywatność

Studio i projektor: `→`, `↓`, spacja, `N`, `Page Down` oznaczają dalej; `←`, `↑`, Backspace, `P`, `Page Up` wstecz. Klikacz musi wysyłać te klawisze i sterowane okno musi mieć fokus. Pola edycji i wybór języka nie przechwytują nawigacji. Pełny ekran projektora: przycisk, `F` lub `F5`; wyjście standardowym mechanizmem przeglądarki. Pełny ekran ukrywa nagłówek i strzałki, zostawiając slajd lub pytanie. QR pojawia się przed startem i przy pytaniach, nie pod PDF-em.

Licznik online maleje po rozłączeniu. Po cichej utracie sieci heartbeat co 20 s i kontrola co 30 s usuwają połączenie po 60–90 s. Historyczna liczba dołączeń jest oddzielna. Szczyt jednoczesnych uczestników jest utrwalany tylko podczas otwartego głosowania i widoczny wyłącznie w Studio, także w archiwum. Surowe liczniki głosów są prywatne; projektor i telefony pokazują procenty. Telefony widzą zbiorczy wynik po zamknięciu.

Głosy są trwale zapisywane przed ACK, mają rosnący numer i przypisaną rundę. Reconnect odtwarza stan; niepotwierdzony głos z sessionStorage jest ponawiany. WebSocket Hibernation z automatycznym ping/pong ogranicza zużycie w bezczynności.

## Języki i nagłówki

PL domyślnie, EN do wyboru w stopce. Preferencja jest zapamiętywana, a linki przenoszą `?lang`. Tytuły i treść pytań/PDF-ów nie są tłumaczone automatycznie. Dropdown obsługuje Enter, spację, strzałki, Escape i Tab. Wspólne animacje fokusu i hovera respektują ograniczenie ruchu i tryb wysokiego kontrastu.

Marka Home prowadzi do Home, Stage do Home, Studio i Live do Stage. Studio nie ma linków Stage/YouTube, Live pozostawia YouTube. Stopka nie zawiera odnośnika do panelu; wejście bezpośrednio przez `/presenter` z logowaniem. `VITE_HOME_URL` ustala adres Home, `NEXT_PUBLIC_STAGE_URL` w Next.js adres Stage (domyślnie `https://stage.codestorybro.com`).

## Weryfikacja

```sh
yarn build
yarn test
yarn test:integration
yarn test:presence
yarn test:e2e
yarn check:worker
DURATION_SECONDS=60 yarn test:load
```

Testy integracyjne używają izolowanego lokalnego workerd, KV i SQLite, 1000 klientów oraz prób przekroczenia limitów. Test obciążeniowy domyślnie trwa godzinę: 1000 klientów, 5 pytań, 10 tys. potwierdzonych głosów ze zmianami odpowiedzi. Testy nie uderzają w produkcję i nie mierzą przydziałów Cloudflare. Do walidacji wdrożenia potrzebny jest osobny test HTTPS, Access i fizycznego telefonu w innej sieci.
