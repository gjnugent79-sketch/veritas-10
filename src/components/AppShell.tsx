'use client';

import { SidebarNav, MobileNav } from './Nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-page text-ink">
      <SidebarNav />
      <div className="flex-1 min-w-0 pb-20 md:pb-0">
        <main className="mx-auto w-full max-w-3xl px-4 sm:px-8 py-8 sm:py-10">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
