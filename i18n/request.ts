/* eslint-disable  @typescript-eslint/no-explicit-any */
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as any
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale,    
  };
});