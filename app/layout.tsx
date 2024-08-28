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
  return (
    <html lang="en">
      <body className={`h-screen w-screen`}>{children}</body>
    </html>
  );
}
