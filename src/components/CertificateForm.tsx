'use client';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { usePathname, useRouter } from '@/libs/i18nNavigation';

type Props = {
  certId?: string;
};

const CertificateForm: FC<Props> = ({ certId }) => {
  const { register, handleSubmit } = useForm<{ id: string }>();
  const t = useTranslations('General');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearchQuery = (updatedQuery: { certId: string }) => {
    const params = new URLSearchParams(searchParams!);
    Object.keys(updatedQuery).forEach((key) => {
      const typedKey = key as keyof typeof updatedQuery;
      if (updatedQuery[typedKey]) {
        params.set(typedKey, updatedQuery[typedKey]);
      } else {
        params.delete(typedKey);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString
      ? `${pathname}?${queryString}`
      : pathname;
    router.push(updatedPath);
  };

  const onSubmit: SubmitHandler<{ id: string }> = ({
    id,
  }: {
    id: string;
  }) => {
    if (!id) {
      return toast.error(t('certificate_check_empty'));
    }

    return updateSearchQuery({ certId: id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex max-w-lg flex-row">

      <Input
        {...register('id')}
        placeholder={t('certificate_check')}
        type="text"
        autoComplete="off"
        name="id"
        id="id"
        defaultValue={certId}
        className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <Button
        type="submit"
        className="ml-4 flex-none !px-4 !py-2 !text-sm"
      >
        {t('check')}
      </Button>
    </form>
  );
};

export default CertificateForm;
