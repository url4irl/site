'use client';

export const LOCALE_STORAGE_KEY = 'url4irl-preferred-locale';

export function getStoredLocale(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredLocale(locale: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function removeStoredLocale(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
  } catch {
    // Silently fail if localStorage is not available
  }
}