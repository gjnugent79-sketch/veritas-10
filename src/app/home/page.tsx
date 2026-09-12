'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { BriefingFeed } from '@/components/BriefingFeed';
import { useProfile } from '@/components/ProfileProvider';

export default function HomePage() {
  const { profile, ready } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!profile.name) router.replace('/');
    else if (!profile.onboarded) router.replace('/onboarding');
  }, [ready, profile, router]);

  if (!ready || !profile.onboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted text-sm">
        Loading…
      </div>
    );
  }

  return (
    <AppShell>
      <p className="text-sm text-muted">Today</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
        Hi {profile.name} 👋
      </h1>
      <h2 className="text-lg font-semibold mt-8 mb-4">Your briefing</h2>
      <BriefingFeed follows={profile.follows} lean={profile.politicsLean} />
    </AppShell>
  );
}
