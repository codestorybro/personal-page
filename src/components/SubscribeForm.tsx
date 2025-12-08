'use client';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/components/Input';
import Button from './Button';

const isValidEmail = (email: string) => {
  const pattern = /\S[^\s@]*@\S+\.\S+/;
  return pattern.test(email);
};

const SubscribeForm: FC = () => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ email: string }>();
  const t = useTranslations('General');

  const onSubmit: SubmitHandler<{ email: string }> = ({
    email,
  }: {
    email: string;
  }) => {
    if (!email) {
      return toast.error(t('subscribe_email_empty'));
    }

    if (!isValidEmail(email)) {
      return toast.error(t('subscribe_email_invalid'));
    }

    setIsLoading(true);

    const res = fetch(`/${locale}/api/subscribe`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    toast.promise(
      res,
      {
        loading: 'Loading ...',
        success: () => {
          reset();
          return t('subscribe_success');
        },
      },
      { success: { duration: 4000 }, error: { duration: 4000 } },
    );

    return res.finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl lg:max-w-lg">
          <p className="mt-4 text-lg text-gray-300">{t('newsletter')}</p>
          <div className="mx-1 mb-1 mt-6 flex max-w-md gap-x-4">
            <Input
              {...register('email')}
              placeholder={t('email')}
              type="text"
              autoComplete="off"
              name="email"
              id="email"
              className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-none rounded-md bg-indigo-500 px-3.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {t('subscribe')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;
