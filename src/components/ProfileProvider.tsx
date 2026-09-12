'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DEFAULT_PROFILE,
  loadProfile,
  saveProfile,
  updateProfile as persistPatch,
} from '@/lib/profile';
import type { PoliticsLean, UserProfile } from '@/lib/types';

interface ProfileCtx {
  profile: UserProfile;
  ready: boolean;
  setName: (name: string) => void;
  setLean: (lean: PoliticsLean) => void;
  toggleFollow: (id: string) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const Ctx = createContext<ProfileCtx | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
    const sync = () => setProfile(loadProfile());
    window.addEventListener('veritas-profile', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('veritas-profile', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const setName = useCallback((name: string) => {
    setProfile(persistPatch({ name: name.trim() }));
  }, []);

  const setLean = useCallback((lean: PoliticsLean) => {
    setProfile(persistPatch({ politicsLean: lean }));
  }, []);

  const toggleFollow = useCallback((id: string) => {
    const p = loadProfile();
    const follows = p.follows.includes(id)
      ? p.follows.filter((x) => x !== id)
      : [...p.follows, id];
    setProfile(persistPatch({ follows }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setProfile(persistPatch({ onboarded: true }));
  }, []);

  const reset = useCallback(() => {
    saveProfile(DEFAULT_PROFILE);
    setProfile(DEFAULT_PROFILE);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      ready,
      setName,
      setLean,
      toggleFollow,
      completeOnboarding,
      reset,
    }),
    [profile, ready, setName, setLean, toggleFollow, completeOnboarding, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProfile() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
