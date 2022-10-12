import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export interface LanguageSwitcherProps {
  onClick?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onClick,
}) => {
  const { locales, asPath, locale: currentLocale } = useRouter();
  type T = keyof typeof mappedLocales;
  const mappedLocales = { nl: "Netherlands", en: "English" };
  return (
    <div className="utrecht-language-switcher">
      {locales &&
        locales.length > 0 &&
        locales.map((locale, i) => (
          <span key={i} className="utrecht-language-switcher_item">
            <Link href={asPath} locale={locale}>
              <a
                onClick={onClick}
                className={clsx("utrecht-link", {
                  "utrecht-language-switcher_item--current":
                    locale === currentLocale,
                })}
                hrefLang={locale}
                lang={locale}
                rel={locale !== currentLocale ? "alternate" : ""}
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
