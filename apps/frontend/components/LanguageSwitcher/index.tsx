import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface Localizations {
  locale: string;
  slug: string;
  __typename: string;
}

export interface LanguageSwitcherProps {
  onClick?: any;
  localizations?: Localizations[];
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onClick, localizations }) => {
  const { locales, asPath, locale: currentLocale } = useRouter();
  type T = keyof typeof mappedLocales;
  const mappedLocales = { nl: 'Netherlands', en: 'English' };

  return (
    <div className="utrecht-language-switcher">
      {localizations
        ? localizations.map(({ locale, slug }, index) => (
            <span key={index} className="utrecht-language-switcher_item">
              <Link href={`/products/${slug}`} locale={locale}>
                <a
                  onClick={onClick}
                  className={clsx('utrecht-link', {
                    'utrecht-language-switcher_item--current': locale === currentLocale,
                  })}
                  hrefLang={locale}
                  lang={locale}
                  rel={locale !== currentLocale ? 'alternate' : ''}
                  title={mappedLocales[locale as T]}
                >
                  {locale.toUpperCase()}
                </a>
              </Link>
            </span>
          ))
        : locales &&
          locales.map((locale, i) => (
            <span key={i} className="utrecht-language-switcher_item">
              <Link href={asPath} locale={locale}>
                <a
                  onClick={onClick}
                  className={clsx('utrecht-link', {
                    'utrecht-language-switcher_item--current': locale === currentLocale,
                  })}
                  hrefLang={locale}
                  lang={locale}
                  rel={locale !== currentLocale ? 'alternate' : ''}
                  title={mappedLocales[locale as T]}
                >
                  {locale.toUpperCase()}
                </a>
              </Link>
            </span>
          ))}
    </div>
  );
};
