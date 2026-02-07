'use client';
import type { FC } from 'react';
import { SealCheckIcon, XCircleIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  id?: string;
};

type IUser = {
  name: string;
  type: string;
};

type ValidationState = 'idle' | 'loading' | 'valid' | 'invalid' | 'error';

const CertValidate: FC<Props> = ({ id }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const t = useTranslations('General');
  const locale = useLocale();

  useEffect(() => {
    if (!id) {
      setValidationState('idle');
      setUser(null);
      return;
    }

    setValidationState('loading');

    fetch(`/${locale}/api/cert-check?certId=${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400 || res.status === 404) {
            setValidationState('invalid');
            setUser(null);
          } else {
            throw new Error(`${res.status} — ${res.statusText}`);
          }
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.body) {
          setUser(data.body);
          setValidationState('valid');
        }
      })
      .catch(() => {
        setValidationState('error');
        setUser(null);
        toast.error(t('certificate_check_error'), { duration: 4000 });
      });
  }, [id, locale, t]);

  return (
    <AnimatePresence mode="wait">
      {id && validationState === 'valid' && user && (
        <motion.div
          key="valid"
          className="my-8 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-green-500/20 p-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <SealCheckIcon size={48} weight="fill" className="text-green-500" />
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p className="text-xl font-bold text-white">{user.name}</p>
            <p className="text-gray-400">{user.type}</p>
          </motion.div>
          <motion.div
            className="mt-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <p className="text-sm text-green-400">{t('certificate_valid')}</p>
          </motion.div>
        </motion.div>
      )}

      {id && validationState === 'invalid' && (
        <motion.div
          key="invalid"
          className="my-8 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-red-500/20 p-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <XCircleIcon size={48} weight="fill" className="text-red-500" />
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p className="text-xl font-bold text-white">{t('certificate_not_found')}</p>
            <p className="text-gray-400">{id}</p>
          </motion.div>
          <motion.div
            className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <p className="text-sm text-red-400">{t('certificate_check_invalid')}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertValidate;
