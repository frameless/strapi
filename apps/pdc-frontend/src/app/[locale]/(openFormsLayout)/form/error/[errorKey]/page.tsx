import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs, Heading, Markdown } from '@/components';
import { fetchData, getStrapiGraphqlURL } from '@/util';
import { GET_OPEN_FORMS_ERROR_PAGE } from '@/query';
import { GetOpenFormsErrorPageQuery } from '../../../../../../../gql/graphql';

type ParamsType = {
  locale: string;
  errorKey: string;
};

interface OpenFormsErrorPageProps {
  params: ParamsType;
  searchParams: { [key: string]: string | undefined };
}

type ErrorKey = 'formulier-niet-gevonden' | 'formulier-server-is-offline' | 'form-not-found' | 'form-server-down';
type NormalizedError = 'form_not_found' | 'form_server_is_offline';
const mappedErrorKies: Record<ErrorKey, NormalizedError> = {
  'formulier-niet-gevonden': 'form_not_found',
  'form-not-found': 'form_not_found',
  'formulier-server-is-offline': 'form_server_is_offline',
  'form-server-down': 'form_server_is_offline',
};
const getMappedError = (key: string): NormalizedError => {
  const normalized = key.trim().toLowerCase() as ErrorKey;
  return mappedErrorKies[normalized];
};

const OpenFormsErrorPage = async ({ params: { errorKey, locale } }: OpenFormsErrorPageProps) => {
  const { t } = await useTranslation(locale, ['open-forms-error-pages', 'common']);
  const type = getMappedError(errorKey);
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
