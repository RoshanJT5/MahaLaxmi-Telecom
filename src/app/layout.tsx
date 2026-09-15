import './globals.css';
import './utilities.css';
import './responsive.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahalaxmi Telecom Private Limited | Welcome',
  description: 'A legacy of trust, connection and service. Trusted Multi-Brand Mobile Retail Chain in India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
