import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs, Heading, Markdown } from '@/components';
import { fetchData, getStrapiGraphqlURL } from '@/util';
import { GET_OPEN_FORMS_ERROR_PAGE } from '@/query';
import { GetOpenFormsErrorPageQuery } from '../../../../../../../gql/graphql';
import snackCase from 'lodash.snakecase';

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
  const type = snackCase(errorKey);

  const { data } = await fetchData<{ data: GetOpenFormsErrorPageQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_OPEN_FORMS_ERROR_PAGE,
    variables: { locale, type },
  });
  const openFromsErrorPageData = data?.openFormsErrorPages?.data[0]?.attributes;

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
        <Heading level={1}>{openFromsErrorPageData?.title}</Heading>
        {openFromsErrorPageData?.body && <Markdown>{openFromsErrorPageData.body}</Markdown>}
      </main>
    </div>
  );
};

export default OpenFormsErrorPage;
