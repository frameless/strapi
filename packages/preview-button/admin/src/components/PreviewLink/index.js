import { useDialog } from '@frameless/ui';
import { Button } from '@strapi/design-system/Button';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { useCMEditViewDataManager, useFetchClient } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { useIntl } from 'react-intl';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import '@utrecht/component-library-css/dist/html.css';
import '@frameless/ui/dist/bundle.css';
import usePluginConfig from '../../hooks/use-plugin-config';
import useCopyHTMLToClipboard from '../../hooks/useCopyHTMLToClipboard';
import useFetchData from '../../hooks/useFetchData';
import { getContentByType, getTrad, getUrl } from '../../utils';
import { Dialog } from '../Modal';
import { Content, HTMLTemplate } from '../index';
import './index.css';

function PreviewLink() {
  const data = useCMEditViewDataManager();
  const client = useFetchClient();
  const { openDialog, close, dialogRef } = useDialog();
  const { fetchData } = useFetchData(client);
  const copyHTMLToClipboard = useCopyHTMLToClipboard();
  const { config } = usePluginConfig();
  const { formatMessage } = useIntl();
  const contentTypes = config.data && config.data.contentTypes;
  const isPreviewSupported = Array.isArray(contentTypes) && contentTypes.find((type) => type.uid === data?.layout?.uid);
  const previewWithDialog = isPreviewSupported?.dialog?.enabled;
  const [priceID, setPriceID] = useState('');
  const [priceData, setPriceData] = useState([]);
  const [clipboardStatus, setClipboardStatus] = useState('button.copy');
  const previewLabel = formatMessage({
    id: getTrad('button.preview'),
    defaultMessage: 'Bekijken',
  });
  const productId = data.initialData?.product && data.initialData?.product[0]?.id;
  const contentComponentProps = {
    locale: 'nl',
    priceZeroLabel: formatMessage({
      id: getTrad('priceWidget.zeroLabel'),
      defaultMessage: '¤ 0,00',
    }),
    priceData,
  };

  useEffect(() => {
    if (productId) {
      Promise.all([
        fetchData({
          url: '/content-manager/collection-types/api::product.product',
          params: {
            price: {
              populate: ['*'],
            },
          },
          id: productId,
        }),
        fetchData({
          url: '/content-manager/collection-types/api::price.price',
          params: {},
          id: priceID,
        }),
      ])
        .then(([productResponse, priceResponse]) => {
          setPriceID(productResponse?.data?.price?.id);
          setPriceData(priceResponse?.data?.price);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch data', error);
        });
    }
  }, [productId, priceID]);

  if (!isPreviewSupported) return null;

  if (previewWithDialog) {
    const vacData = {
      title: data?.initialData?.vac?.vraag,
      content: data?.initialData?.vac?.antwoord,
    };
    const type = isPreviewSupported.query.type;

    const content = getContentByType({
      vac: <Content data={vacData.content} title={vacData?.title} {...contentComponentProps} />,
      internalField: (
        <Content
          data={data?.initialData?.content?.contentBlock}
          title={data?.initialData?.title}
          {...contentComponentProps}
        />
      ),
      additionalInformation: (
        <Content
          data={data?.initialData?.content?.contentBlock}
          title={data?.initialData?.title}
          {...contentComponentProps}
        />
      ),
      type,
    });

    const onClickCopyHTMLToDocxHandler = () => {
      setClipboardStatus('button.copied');
      copyHTMLToClipboard(
        renderToString(
          <HTMLTemplate title="Preview" lang="nl">
            {content?.data}
          </HTMLTemplate>,
        ),
      );
      setTimeout(() => {
        setClipboardStatus('button.copy');
      }, 1000);
    };

    return (
      <div className={['preview-dialog', 'utrecht-theme'].join(' ')}>
        <Button startIcon={<Eye />} className="utrecht-preview-link" onClick={openDialog}>
          {previewLabel}
        </Button>
        <Dialog
          ref={dialogRef}
          title={`${previewLabel}: ${data.initialData?.title || vacData?.title}`}
          closeButton={{
            onClick: close,
          }}
          startAction={{
            onClick: close,
            label: formatMessage({
              id: getTrad('button.cancelPreview'),
              defaultMessage: 'Sluiten',
            }),
          }}
          endAction={{
            onClick: onClickCopyHTMLToDocxHandler,
            label: formatMessage({
              id: getTrad(clipboardStatus),
              defaultMessage: 'Copy',
            }),
          }}
        >
          <div className="utrecht-html">{content.data}</div>
        </Dialog>
      </div>
    );
  }
  const url = getUrl(config.data.domain);
  if (url && !previewWithDialog) {
    url.pathname = '/api/preview';
    url.searchParams.set('secret', config.data.token);
    url.searchParams.set('type', isPreviewSupported.query.type);
    url.searchParams.set('slug', data.initialData.slug);
    url.searchParams.set('locale', data.initialData.locale);
    return (
      <LinkButton
        size="S"
        startIcon={<Eye />}
        className="utrecht-preview-link"
        href={url.href}
        target="_blank"
        rel="noopener noreferrer"
        title={previewLabel}
      >
        {previewLabel}
      </LinkButton>
    );
  } else {
    return null;
  }
}

export default PreviewLink;
