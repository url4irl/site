import { redirect } from 'next/navigation';

// This page only renders when the user accesses `/` without a locale
export default function RootPage() {
  // Redirect to the default locale
  redirect('/en');
}