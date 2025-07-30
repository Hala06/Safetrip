import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SafeTravel - Your Values-Based Travel Assistant',
  description: 'Explore cities safely and comfortably with personalized recommendations for Muslim travelers, solo adventurers, and accessibility-conscious explorers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-950 dark:to-dark-900`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
