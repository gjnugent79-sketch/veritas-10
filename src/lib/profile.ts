'use client';

import type { PoliticsLean, UserProfile } from './types';

const KEY = 'veritas10.profile';

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  follows: [],
  politicsLean: 'centre',
  onboarded: false,
};

export function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return { ...DEFAULT_PROFILE };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return {
      name: parsed.name ?? '',
      follows: Array.isArray(parsed.follows) ? parsed.follows : [],
      politicsLean: (parsed.politicsLean as PoliticsLean) || 'centre',
      onboarded: !!parsed.onboarded,
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('veritas-profile'));
}

export function updateProfile(patch: Partial<UserProfile>): UserProfile {
  const next = { ...loadProfile(), ...patch };
  saveProfile(next);
  return next;
}

export function toggleFollow(entityId: string): UserProfile {
  const p = loadProfile();
  const follows = p.follows.includes(entityId)
    ? p.follows.filter((id) => id !== entityId)
    : [...p.follows, entityId];
  return updateProfile({ follows });
}

export function isFollowing(entityId: string): boolean {
  return loadProfile().follows.includes(entityId);
}
