'use client';

import { AppConfig } from '@/utils/AppConfig';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useCopyEmail = () => {
  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(AppConfig.author.email);
      toast.success('Skopiowano adres email');
    } catch {
      toast.error('Nie udało się skopiować adresu email');
    }
  }, []);
};
