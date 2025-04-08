'use client';

import { getPathAndSearchParams } from '@frameless/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, usePathname, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import { LanguageSwitcher, LanguageSwitcherSkeleton } from '@/components';
import { fetchData } from '@/util/fetchData';
import { fallbackLng, languages } from '../app/i18n/settings';

export interface Localizations {
  locale: string;
  slug: string;
}

export interface ClientLanguageSwitcherProps {
  localizations?: Localizations[];
  locales: typeof languages;
  currentLocale: string;
}

export const ClientLanguageSwitcher = ({ locales, currentLocale }: ClientLanguageSwitcherProps) => {
  const pathName = usePathname();
  const currentSegment = useSelectedLayoutSegment() as string;
  const params = useParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return `/${fallbackLng}`;
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const defaultLocalizations = locales.map((locale: string) => ({ pathname: redirectedPathName(locale), locale }));

  const { fullURL } = getPathAndSearchParams({
    segments: ['api', 'current-pathname'],
    queryParams: { slug: params.slug as string, locale: params.locale as string, segment: currentSegment },
  });

  const { data, isFetching } = useQuery({
    queryKey: ['getSlugs'],
    enabled: !!params.slug,
    queryFn: async () => fetchData<any>({ url: fullURL, method: 'GET' }),
  });

  if (!isFetching && data?.localizations.length > 0) {
    return <LanguageSwitcher Link={Link} items={data.localizations} currentLocale={currentLocale} />;
  }

  return !isFetching ? (
    <LanguageSwitcher Link={Link} items={defaultLocalizations} currentLocale={currentLocale} />
  ) : (
    <LanguageSwitcherSkeleton />
  );
};
