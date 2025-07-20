import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modern DOS UI',
  description: 'DOS-style UI demo',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className="font-dos min-h-screen"
        style={{ backgroundColor: '#0000AA', color: '#55FFFF' }}
      >
        {children}
      </body>
    </html>
  );
}
