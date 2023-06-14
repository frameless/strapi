'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages } from '@/app/i18n/settings';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/nl';
    const segments = pathName.split('/');
    segments[1] = locale;

    return segments.join('/');
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {languages.map((locale) => {
          return (
            <li key={locale}>
              <Link className="utrecht-link" href={redirectedPathName(locale)}>
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
