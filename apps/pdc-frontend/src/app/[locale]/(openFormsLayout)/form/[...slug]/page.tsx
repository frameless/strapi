import { headers } from 'next/headers';

import { useTranslation } from '@/app/i18n';
import { Heading1 } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { OpenFormsEmbed } from '@/components/OpenFormsEmbed/OpenFormsEmbed';
import { openFormValidator } from '@/util';
import { createOpenFormsClientApiUrl } from '@/util/openFormsSettings';

type FormPageProps = {
  params: Promise<{
    locale: string;
    slug: [formId: string, formStep: string];
  }>;
};

const FormPage = async (props: FormPageProps) => {
  const params = await props.params;
  const {
    locale,
    slug: [formId],
  } = params;
  const { t } = await useTranslation(locale, 'common');
  const nonce = (await headers()).get('x-nonce') || '';
  const formInfo = await openFormValidator({ formId });

  return (
    <>
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
            current: false,
          },
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.products'),
          current: false,
        }}
      />
      <main id="main">
        <div className="utrecht-form-container utrecht-form-container--openforms">
          <OpenFormsEmbed
            apiUrl={createOpenFormsClientApiUrl() || ''}
            nonce={nonce}
            slug={formId}
            fallback={formInfo ? <Heading1>{formInfo.name}</Heading1> : null}
          />
        </div>
      </main>
    </>
  );
};

export default FormPage;
