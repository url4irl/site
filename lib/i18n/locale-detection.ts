/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';

import { routing } from '../../i18n/routing';
import { getStoredLocale } from './locale-storage';

export function detectUserLocale(): string {
  // 1. Check stored preference first
  const storedLocale = getStoredLocale();
  if (storedLocale && routing.locales.includes(storedLocale as any)) {
    return storedLocale;
  }

  // 2. Check browser language if available
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language;
    
    // Try exact match first
    if (routing.locales.includes(browserLang as any)) {
      return browserLang;
    }
    
    // Try language without region (e.g., 'en-US' -> 'en')
    const langCode = browserLang.split('-')[0];
    if (routing.locales.includes(langCode as any)) {
      return langCode;
    }
  }

  // 3. Check additional browser languages
  if (typeof navigator !== 'undefined' && navigator.languages) {
    for (const lang of navigator.languages) {
      if (routing.locales.includes(lang as any)) {
        return lang;
      }
      
      const langCode = lang.split('-')[0];
      if (routing.locales.includes(langCode as any)) {
        return langCode;
      }
    }
  }

  // 4. Fallback to default locale
  return routing.defaultLocale;
}

export function getLocaleDisplayName(locale: string): string {
  const displayNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    pt: 'Português',
    zh: '中文'
  };
  
  return displayNames[locale] || locale;
}