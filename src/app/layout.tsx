import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ridgewells Catering | Washington DC Luxury Catering & Events Since 1928',
  description:
    'Washington DC’s premier bespoke catering and landmark event hospitality since 1928. Exclusive caterer and manager of the historic Andrew W. Mellon Auditorium, Haute Defense Catering, and culinary designs by Executive Chef Kashif Browne.',
  keywords: [
    'Ridgewells Catering',
    'Andrew W. Mellon Auditorium Catering',
    'Washington DC Luxury Wedding Catering',
    'Haute Defense Catering',
    'Chef Kashif Browne',
    'Bethesda Catering Tasting Room',
    'Major Events Hospitality US Open',
  ],
  openGraph: {
    title: 'Ridgewells Catering | Washington DC Luxury Catering & Events Since 1928',
    description:
      'Stunning menus. Impeccable service. Unforgettable memories. Celebrating distinctive events and timeless hospitality across the Capital for nearly a century.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ridgewells Hospitality Group',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
