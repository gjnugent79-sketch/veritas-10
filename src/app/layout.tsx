import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ProfileProvider } from '@/components/ProfileProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Veritas 10',
  description:
    'Personalised editorial news across football, politics, cars, finance and AI — briefed in plain words, every claim linked to its source.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}
