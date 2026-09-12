'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/home', label: 'Home', icon: HomeIcon },
  { href: '/explore', label: 'Explore', icon: ExploreIcon },
  { href: '/following', label: 'Following', icon: FollowingIcon },
  { href: '/search', label: 'Search', icon: SearchIcon },
];

function navActive(pathname: string, href: string) {
  if (href === '/home') return pathname === '/home';
  return pathname === href || pathname.startsWith(href + '/');
}

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 min-h-screen sticky top-0">
      <Link href="/home" className="px-3 mb-8 focus-ring rounded-lg">
        <span className="text-lg font-bold tracking-tight text-ink">Veritas 10</span>
      </Link>
      <nav className="flex flex-col gap-1" aria-label="Main">
        {items.map(({ href, label, icon: Icon }) => {
          const active = navActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-ring ${
                active
                  ? 'bg-surface-2 text-ink'
                  : 'text-muted hover:bg-surface-2/70 hover:text-ink'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon active={active} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-surface/95 backdrop-blur safe-bottom"
      aria-label="Mobile"
    >
      <ul className="flex justify-around px-2 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = navActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[11px] font-medium focus-ring ${
                  active ? 'text-ink' : 'text-muted'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon active={active} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? 'text-ink' : 'text-muted'}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function ExploreIcon({ active }: { active?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? 'text-ink' : 'text-muted'}>
      <path d="M12 3l7 9-7 9-7-9 7-9z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function FollowingIcon({ active }: { active?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? 'text-ink' : 'text-muted'}>
      <path
        d="M12 3.5l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 15.9l-4.8 2.36.92-5.34L4.24 9.14l5.36-.78L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
      />
    </svg>
  );
}

function SearchIcon({ active }: { active?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={active ? 'text-ink' : 'text-muted'}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
