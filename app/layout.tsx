import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pacino Dashboard",
  description: "Real-time AI agent activity dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-950">
        {children}
      </body>
    </html>
  );
}
