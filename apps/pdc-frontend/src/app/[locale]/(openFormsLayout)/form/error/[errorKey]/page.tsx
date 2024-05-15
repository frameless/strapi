import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs, Heading, Paragraph } from '@/components';

type ParamsType = {
  locale: string;
  errorKey: string;
};

interface OpenFormsErrorPageProps {
  params: ParamsType;
  searchParams: { [key: string]: string | undefined };
}

const OpenFormsErrorPage = async ({ params: { errorKey, locale } }: OpenFormsErrorPageProps) => {
  const { t } = await useTranslation(locale, ['open-forms-error-pages', 'common']);
  return (
    <div>
      <Breadcrumbs
        label={
          t('components.breadcrumbs.ariaLabel', {
            defaultValue: 'Kruimelpad',
          }) as string
        }
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: false,
          },
          {
            href: '/',
            label: t('components.breadcrumbs.label.online-loket'),
            current: true,
          },
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.online-loket'),
          current: false,
        }}
        Link={Link}
      />
      <main id="main">
        <Heading level={1}>{t(`${errorKey}.title`)}</Heading>
        <Paragraph>{t(`${errorKey}.message`)}</Paragraph>
      </main>
    </div>
  );
};

export default OpenFormsErrorPage;
