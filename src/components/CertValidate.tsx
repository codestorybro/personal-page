'use client';
import type { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Checkmark from '@/components/Checkmark';

type Props = {
  id?: string;
};

type IUser = {
  name: string;
  type: string;
};

const CertValidate: FC<Props> = ({ id }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('General');
  const locale = useLocale();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    const res = fetch(`/${locale}/api/cert-check?certId=${id}`);
    res.then(res => res.json())
      .then(({ body }) => {
        setUser(body);
      })
      .catch(() => {
        setUser(null);
      });

    toast.promise(
      res,
      {
        loading: 'Loading ...',
        success: (data: { ok: any; status: any; statusText: any }) => {
          if (!data.ok) {
            setUser(null);
            throw new Error(`${data.status} — ${data.statusText}`);
          }
          return ''; // Return an empty string to satisfy the renderable requirement
        },
        error: (err: { status: number }) => {
          if (err.status >= 400) {
            return t('certificate_check_error');
          } else {
            return t('certificate_check_invalid');
          }
        },
      },
      {
        success: { style: { display: 'none' } },
        error: { duration: 4000 },
      },
    );

    res.finally(() => setIsLoading(false));
  }, [id, locale, t]);

  return (
    <>
      {id && !isLoading && user && (
        <div className="my-4 animate-fadeIn text-lg font-bold text-success opacity-0 transition-opacity duration-500">
          {user.name}
          {' '}
          -
          {' '}
          {user.type}
          <Checkmark />
        </div>
      )}
    </>
  );
};

export default CertValidate;
