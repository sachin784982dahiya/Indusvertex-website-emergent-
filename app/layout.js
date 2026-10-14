import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { headers } from 'next/headers';


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: 'IndusVertex Private Limited — Transforming Vision into Infrastructure Reality',
  description: 'IndusVertex Private Limited is an integrated engineering, infrastructure, compliance, legal advisory, and technology solutions company delivering end-to-end services across power infrastructure, renewable energy, data centers, EV infrastructure, civil construction, environmental solutions, automation, compliance, and project management.',
  keywords: 'IndusVertex, power transmission, data center, solar energy, BESS, EV charging, civil infrastructure, environmental compliance, legal advisory, Ghaziabad, India, EPC',
  openGraph: {
    title: 'IndusVertex Private Limited — Engineering. Infrastructure. Compliance.',
    description: 'Transforming Vision into Infrastructure Reality',
    type: 'website'
  }
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const isLegalMode = headersList.get('x-legal-mode') === '1';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          {!isLegalMode && <Navbar />}
          <main className={`min-h-screen${isLegalMode ? '' : ' pt-9'}`}>{children}</main>
          {!isLegalMode && <Footer />}
          {!isLegalMode && <FloatingButtons />}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
