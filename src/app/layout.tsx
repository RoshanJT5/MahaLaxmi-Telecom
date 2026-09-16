import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahalaxmi Telecom | Mobile Retail & Franchise',
  description: 'Four mobile retail formats backed by more than twenty years of telecom distribution experience in Maharashtra.',
  openGraph: { title: 'Mahalaxmi Telecom', description: 'Where technology meets trust.', images: ['/jm-showroom-hero.png'] },
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
