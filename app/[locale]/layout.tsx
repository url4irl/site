import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { LanguageSelector } from '../../components/language-selector';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages();
  const siteMessages = messages.site as any;
  
  return {
    title: siteMessages?.title || "URL4IRL - Technology that serves humanity",
    description: siteMessages?.description || "A paradigm shift from attention-harvesting applications to life-enhancing tools that strengthen real-world connections and empower individual agency.",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="absolute top-4 right-4 z-50">
            <LanguageSelector currentLocale={locale} />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}