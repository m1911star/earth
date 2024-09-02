import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Earth',
  description: 'Earth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // add favicon
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <body className={`h-screen w-screen`}>{children}</body>
    </html>
  );
}
