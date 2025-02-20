'use client';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  locale: string;
};

export const Header: FC<Props> = () => {
  return (
    <div className="flex w-full justify-between">
      <Link href="/" className="rounded-3xl focus:outline-none focus:ring-2 focus-visible:outline-none">
        <div className="flex h-22 flex-row items-center focus:outline-none focus:ring-2 focus-visible:outline-none">
          <Image
            width={50}
            height={68}
            src="/assets/img/logo-main.svg"
            alt="profile"
            priority
          />
          <span className="ml-4 font-logoText text-5xl text-white">
            <span className="text-7xl">c</span>
            ode$toryBro
          </span>
        </div>
      </Link>
    </div>
  );
};
