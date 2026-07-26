import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio EAMO",
  description: "Independent contemporary design practice based in Istanbul.",
  openGraph: {
    title: "Studio EAMO",
    description: "Independent contemporary design practice based in Istanbul.",
    url: "https://studioeamo.com",
    siteName: "Studio EAMO",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;300;400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
