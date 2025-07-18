import "./globals.css";

export const metadata = {
  title: "Modern DOS UI",
  description: "DOS-style UI demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-dos min-h-screen"
        style={{ backgroundColor: '#0000AA', color: '#55FFFF' }}
      >
        {children}
      </body>
    </html>
  );
}
