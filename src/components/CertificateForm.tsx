'use client';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  certId?: string;
};

const CertificateForm: FC<Props> = ({ certId }) => {
  const { register, handleSubmit } = useForm<{ id: string }>();
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
      return toast.error('Enter\u00A0a certificate ID');
    }

    return updateSearchQuery({ certId: id });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:flex-row"
    >
      <Input
        {...register('id')}
        placeholder="Certificate ID"
        aria-label="Certificate ID"
        type="text"
        autoComplete="off"
        name="id"
        id="id"
        defaultValue={certId}
      />
      <Button
        type="submit"
        className="flex-none sm:!px-6 sm:!py-3 sm:!text-base"
      >
        Verify
      </Button>
    </form>
  );
};

export default CertificateForm;
