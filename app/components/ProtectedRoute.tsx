'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const accountData = localStorage.getItem('accountData');
    if (!accountData) {
      router.push('/');
    }
  }, [router]);

  return <div>{children}</div>;
}