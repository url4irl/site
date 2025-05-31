'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { routing } from '../i18n/routing';
import { detectUserLocale, getLocaleDisplayName } from '../lib/i18n/locale-detection';
import { setStoredLocale } from '../lib/i18n/locale-storage';

interface LanguageSelectorProps {
  currentLocale: string;
  className?: string;
}

export function LanguageSelector({ currentLocale, className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLocaleChange = (locale: string) => {
    // Store user preference
    setStoredLocale(locale);
    
    // Update URL
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPathname);
    
    setIsOpen(false);
  };

  const currentDisplayName = getLocaleDisplayName(currentLocale);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-background border border-border rounded-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span>{currentDisplayName}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-border bg-background shadow-lg">
            <div className="py-1">
              {routing.locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className={`
                    block w-full px-4 py-2 text-left text-sm transition-colors
                    ${locale === currentLocale 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  {getLocaleDisplayName(locale)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}