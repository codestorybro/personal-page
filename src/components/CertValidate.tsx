'use client';

import { SealCheckIcon, XCircleIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useLocale } from '../../packages/ui/Locale';

type Certificate = {
  name: string;
  type: string;
};

type Result =
  | { id: string; status: 'valid'; certificate: Certificate }
  | { id: string; status: 'invalid' | 'error' };

export default function CertValidate({ id }: { id?: string }) {
  const { pick } = useLocale();
  const [result, setResult] = useState<Result>();

  useEffect(() => {
    if (!id) {
      setResult(undefined);
      return;
    }

    const controller = new AbortController();
    const query = new URLSearchParams({ certId: id });

    async function verify(id: string): Promise<Result> {
      const response = await fetch(`/api/cert-check?${query}`, { signal: controller.signal });
      if (response.status === 400 || response.status === 404) {
        return { id, status: 'invalid' };
      }
      if (!response.ok) {
        return { id, status: 'error' };
      }
      const data = await response.json();
      return data?.body
        ? { id, status: 'valid', certificate: data.body }
        : { id, status: 'error' };
    }

    verify(id)
      .then((nextResult) => {
        if (!controller.signal.aborted) {
          setResult(nextResult);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ id, status: 'error' });
        }
      });

    return () => controller.abort();
  }, [id]);

  const current = result?.id === id ? result : undefined;

  return (
    <div role="status" aria-atomic="true">
      {id && !current && <p className="mt-6 text-muted">{pick('Checking certificate…', 'Sprawdzam certyfikat…')}</p>}
      {current?.status === 'valid' && (
        <div className="mt-6 flex items-start gap-4 border border-rule bg-surface p-5">
          <SealCheckIcon size={28} className="shrink-0 text-success" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-success">{pick('This certificate is valid ✓', 'Ten certyfikat jest ważny ✓')}</p>
            <p className="row-title mt-2">{current.certificate.name}</p>
            <p className="text-muted">{current.certificate.type}</p>
          </div>
        </div>
      )}
      {current?.status === 'invalid' && (
        <div className="mt-6 flex items-start gap-4 border border-rule bg-surface p-5">
          <XCircleIcon size={28} className="shrink-0 text-error" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-error">{pick('Certificate not found', 'Nie znaleziono certyfikatu')}</p>
            <p className="mt-2 break-all text-ink">{id}</p>
            <p className="text-muted">{pick('No certificate exists with this ID', 'Nie ma certyfikatu o tym identyfikatorze')}</p>
          </div>
        </div>
      )}
      {current?.status === 'error' && (
        <p className="mt-6 border border-rule bg-surface p-5 text-error">{pick('The certificate could not be checked', 'Nie udało się sprawdzić certyfikatu')}</p>
      )}
    </div>
  );
}
