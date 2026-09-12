'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/components/ProfileProvider';
import { SplashName } from '@/components/Onboarding';

export default function RootPage() {
  const { profile, ready } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (profile.onboarded && profile.name) {
      router.replace('/home');
    } else if (profile.name && !profile.onboarded) {
      router.replace('/onboarding');
    }
  }, [ready, profile, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page text-muted text-sm">
        Loading…
      </div>
    );
  }

  if (profile.onboarded && profile.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page text-muted text-sm">
        Opening your briefing…
      </div>
    );
  }

  return <SplashName />;
}
