'use client';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import Input from '@/components/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from './Button';

const isValidEmail = (email: string) => {
  const pattern = /\S[^\s@]*@\S+\.\S+/;
  return pattern.test(email);
};

const SubscribeForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = ({
    email,
  }: {
    email: string;
  }) => {
    if (!email) {
      return toast.error('E-mail jest pusty');
    }

    if (!isValidEmail(email)) {
      return toast.error('E-mail nie jest poprawny');
    }

    setIsLoading(true);

    const res = fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    toast.promise(
      res,
      {
        loading: 'Ładowanie...',
        success: () => {
          reset();
          return 'Sprawdź swoją skrzynkę e-mail, aby potwierdzić subskrypcję';
        },
      },
      { success: { duration: 4000 }, error: { duration: 4000 } },
    );

    return res.finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl pb-8 lg:max-w-lg">
          <p className="mt-4 text-lg text-gray-300">Bądź na bieżąco i zapisz się do newslettera!</p>
          <div className="mx-1 mb-1 mt-6 flex max-w-md items-center gap-x-4">
            <Input
              {...register('email')}
              placeholder="Adres email"
              type="text"
              autoComplete="off"
              name="email"
              id="email"
              className="min-w-0 flex-auto rounded-md bg-white/5 !py-2 px-3.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-none !py-2 !text-base sm:!px-6"
            >
              Subskrybuj
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;
