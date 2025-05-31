import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr', 'de', 'pt', 'zh'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // Automatic locale detection from headers
  localeDetection: true
});