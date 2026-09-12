'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/components/ProfileProvider';
import { OnboardingFlow } from '@/components/Onboarding';

export default function OnboardingPage() {
  const { profile, ready } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!profile.name) router.replace('/');
    else if (profile.onboarded) router.replace('/home');
  }, [ready, profile, router]);

  if (!ready || !profile.name || profile.onboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted text-sm">
        Loading…
      </div>
    );
  }

  return <OnboardingFlow />;
}
