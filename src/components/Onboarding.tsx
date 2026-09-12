'use client';

import { useMemo, useState } from 'react';
import { CATALOGUE, PILLARS } from '@/lib/catalogue';
import { useProfile } from './ProfileProvider';
import type { PoliticsLean } from '@/lib/types';
import { useRouter } from 'next/navigation';

const LEANS: { id: PoliticsLean; label: string; hint: string }[] = [
  { id: 'left', label: 'Left', hint: 'Prefer left-leaning + wire sources' },
  { id: 'centre', label: 'Centre', hint: 'Wire and centre outlets only' },
  { id: 'right', label: 'Right', hint: 'Prefer right-leaning + wire sources' },
  { id: 'both', label: 'Both sides', hint: 'Show left and right, labelled' },
];

const SUGGESTED = [
  'pl',
  'uk-politics',
  'openai',
  'ftse100',
  'bmw',
  'us-politics',
  'nvidia-ai',
  'arsenal',
];

export function SplashName() {
  const { profile, setName } = useProfile();
  const [value, setValue] = useState(profile.name);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-page">
      <div className="w-full max-w-md text-center space-y-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            Veritas 10
          </h1>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-accent rounded-full" />
          <p className="mt-5 text-muted text-[15px] leading-relaxed">
            Football, politics, cars, finance and AI — briefed in plain words,
            every claim linked to its source.
          </p>
        </div>

        <form
          className="space-y-4 text-left"
          onSubmit={(e) => {
            e.preventDefault();
            if (!value.trim()) return;
            setName(value.trim());
            router.push('/onboarding');
          }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            What should we call you?
          </label>
          <input
            id="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="First name"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink focus-ring"
            autoComplete="given-name"
            required
          />
          <p className="text-xs text-muted">
            Stored only on this device — we do not create an account.
          </p>
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink/90 focus-ring"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export function OnboardingFlow() {
  const { profile, toggleFollow, setLean, completeOnboarding } = useProfile();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const suggested = useMemo(
    () => CATALOGUE.filter((e) => SUGGESTED.includes(e.id)),
    [],
  );

  return (
    <div className="min-h-screen bg-page px-4 py-10">
      <div className="mx-auto max-w-lg space-y-8">
        <div>
          <p className="text-sm text-muted">Hi {profile.name || 'there'} 👋</p>
          <h1 className="text-3xl font-bold tracking-tight mt-1">
            {step === 0 ? 'Follow a few subjects' : 'Politics source lean'}
          </h1>
          <p className="text-muted mt-2 text-[15px]">
            {step === 0
              ? 'Pick the leagues, countries, brands and companies you care about. You can change these anytime.'
              : 'This applies only to politics. Other pillars stay centre / wire.'}
          </p>
        </div>

        {step === 0 && (
          <div className="space-y-3">
            {suggested.map((e) => {
              const on = profile.follows.includes(e.id);
              const pillar = PILLARS.find((p) => p.id === e.pillar);
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => toggleFollow(e.id)}
                  className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition focus-ring ${
                    on
                      ? 'border-accent bg-accent/5'
                      : 'border-border bg-surface hover:bg-surface-2'
                  }`}
                  aria-pressed={on}
                >
                  <span>
                    <span className="font-medium text-ink">{e.label}</span>
                    <span className="block text-xs text-muted mt-0.5">
                      {pillar?.emoji} {pillar?.label}
                    </span>
                  </span>
                  <span
                    className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                      on ? 'bg-accent text-white' : 'bg-surface-2 text-muted'
                    }`}
                  >
                    {on ? 'Following' : 'Follow'}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              disabled={profile.follows.length === 0}
              onClick={() => setStep(1)}
              className="w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white disabled:opacity-40 focus-ring"
            >
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            {LEANS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLean(l.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left focus-ring ${
                  profile.politicsLean === l.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-surface'
                }`}
                aria-pressed={profile.politicsLean === l.id}
              >
                <span className="font-medium">{l.label}</span>
                <span className="block text-xs text-muted mt-0.5">{l.hint}</span>
              </button>
            ))}
            <p className="text-xs text-muted pt-2">
              Our editorial outlet map (not AllSides/MBFC): Left — Guardian,
              Independent, HuffPost, MSNBC. Centre — Reuters, AP, BBC, FT,
              Bloomberg, Al Jazeera English. Right — Telegraph, Times,
              Spectator, Fox News, WSJ.
            </p>
            <button
              type="button"
              onClick={() => {
                completeOnboarding();
                router.push('/home');
              }}
              className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-dark focus-ring"
            >
              Open my briefing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
