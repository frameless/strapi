'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, usePathname, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import { LanguageSwitcher, LanguageSwitcherSkeleton } from '@/components';
import { createURL } from '@/util/create-url';
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
  const currentSegment = useSelectedLayoutSegment();
  const params = useParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return `/${fallbackLng}`;
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const defaultLocalizations = locales.map((locale: string) => ({ pathname: redirectedPathName(locale), locale }));
  const getSlugsURLParams = {
    slug: params.slug,
    locale: params.locale,
    segment: currentSegment,
  };
  const getSlugsURL = createURL('/api/current-pathname', getSlugsURLParams);
  const { data, isFetching } = useQuery({
    queryKey: ['getSlugs'],
    enabled: !!params.slug,
    queryFn: async () => fetchData({ url: getSlugsURL, method: 'GET' }),
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
