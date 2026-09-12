'use client';

import { useEffect, useState } from 'react';
import { isFollowing, toggleFollow } from '@/lib/profile';

export function FollowButton({ entityId }: { entityId: string }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(isFollowing(entityId));
    const sync = () => setFollowing(isFollowing(entityId));
    window.addEventListener('veritas-profile', sync);
    return () => window.removeEventListener('veritas-profile', sync);
  }, [entityId]);

  return (
    <button
      type="button"
      onClick={() => {
        toggleFollow(entityId);
        setFollowing(isFollowing(entityId));
      }}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${
        following
          ? 'bg-accent text-white hover:bg-accent-dark'
          : 'bg-ink text-white hover:bg-ink/90'
      }`}
      aria-pressed={following}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
}
