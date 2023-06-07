'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, usePathname, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import { i18n, Locale } from '@/i18n-config';
import { createURL } from '@/util/create-url';
import { LanguageSwitcher, LanguageSwitcherSkeleton } from './components/LanguageSwitcher';

export interface Localizations {
  locale: string;
  slug: string;
}

export interface ClientLanguageSwitcherProps {
  onClick?: any;
  localizations?: Localizations[];
  locales: typeof i18n.locales;
  currentLocale: Locale;
}

export const ClientLanguageSwitcher = ({ locales, currentLocale }: ClientLanguageSwitcherProps) => {
  const pathName = usePathname();
  const currentSegment = useSelectedLayoutSegment();
  const params = useParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/nl';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const defaultLocalizations = locales.map((locale: Locale) => ({ pathname: redirectedPathName(locale), locale }));
  const getSlugsURLParams = {
    slug: params.slug,
    locale: params.locale,
    segment: currentSegment,
  };
  const getSlugsURL = createURL('/api/current-pathname', getSlugsURLParams);
  const { data, isFetching } = useQuery({
    queryKey: ['getSlugs'],
    enabled: !!params.slug,
    queryFn: async () =>
      fetch(getSlugsURL, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        cache: 'no-store',
      }).then((res) => {
        return res.json();
      }),
  });

  if (!isFetching && data?.localizations.length > 0) {
    return <LanguageSwitcher items={data.localizations} currentLocale={currentLocale} />;
  }

  return !isFetching ? (
    <LanguageSwitcher items={defaultLocalizations} currentLocale={currentLocale} />
  ) : (
    <LanguageSwitcherSkeleton />
  );
};
