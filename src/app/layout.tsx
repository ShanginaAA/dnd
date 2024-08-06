import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { StrictMode } from 'react';

export const metadata: Metadata = {
  title: 'Arhcity Forms',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="ru">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </StrictMode>
  );
}
