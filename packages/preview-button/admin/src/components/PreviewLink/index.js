import { useDialog } from '@frameless/ui';
import { addHeadingOncePerCategory } from '@frameless/utils';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { useCMEditViewDataManager, useFetchClient } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import React, { useEffect, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { useIntl } from 'react-intl';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import '@frameless/ui/dist/bundle.css';
import usePluginConfig from '../../hooks/use-plugin-config';
import useCopyHTMLToClipboard from '../../hooks/useCopyHTMLToClipboard';
import useFetchData from '../../hooks/useFetchData';
import {
  combineSimilarCategories,
  concatenateFieldValues,
  getContentByType,
  getPreviewUrl,
  getTrad,
  getUIDFromHref,
  getUrl,
  processProductData,
} from '../../utils';
import { DialogPreviewButton } from '../DialogPreviewButton';
import { Content, HTMLTemplate } from '../index';
import './index.css';

const PreviewLink = () => {
  const data = useCMEditViewDataManager();
  const client = useFetchClient();
  const { openDialog, close, dialogRef } = useDialog();
  const { fetchData } = useFetchData(client);
  const copyHTMLToClipboard = useCopyHTMLToClipboard();
  const { config } = usePluginConfig();
  const { formatMessage } = useIntl();

  const contentTypes = config?.data?.contentTypes || [];
  const isPreviewSupported = useMemo(
    () => Array.isArray(contentTypes) && contentTypes.find((type) => type.uid === data?.layout?.uid),
    [contentTypes, data?.layout?.uid],
  );

  const type = isPreviewSupported?.query?.type;
  const previewType = isPreviewSupported?.preview?.type || 'page'; // Default to 'page' if undefined
  const previewOptions = useMemo(
    () => ({
      dialog: previewType === 'dialog' || previewType === 'both',
      page: previewType === 'page' || previewType === 'both',
    }),
    [previewType],
  );

  const [priceID, setPriceID] = useState('');
  const [priceData, setPriceData] = useState([]);
  const [clipboardStatus, setClipboardStatus] = useState('button.copy');
  const [additionalInformation, setAdditionalInformation] = useState([]);
  const [productInternalData, setProductInternalData] = useState();
  const previewInDialogButtonLabel = formatMessage({
    id: getTrad('button.dialogPreview'),
    defaultMessage: 'Voorbeeld in dialoogvenster',
  });
  const previewInPageButtonLabel = formatMessage({
    id: getTrad('button.pagePreview'),
    defaultMessage: 'Voorbeeld op pagina',
  });

  const contentComponentProps = {
    locale: 'nl',
    priceZeroLabel: formatMessage({ id: getTrad('priceWidget.zeroLabel'), defaultMessage: '¤ 0,00' }),
    priceData,
  };

  const url = getUrl(config?.data?.domain);
  const vacData = {
    title: data.initialData?.title,
    content: data?.initialData?.vac?.antwoord,
  };
  const isAdditionalInformation =
    data.initialData?.additional_information && Array.isArray(data.initialData?.additional_information);
  const additionalInformationUid = getUIDFromHref(data.initialData?.additional_information?.[0]?.href);
  const additionalInformationId = isAdditionalInformation && data.initialData?.additional_information[0]?.id;
  const productInternalFieldBlock =
    Array.isArray(data.initialData?.sections) &&
    data.initialData?.sections?.find((section) => section?.__component === 'components.internal-block-content')
      ?.internal_field;
  const productInternalFieldBlockUID = getUIDFromHref(productInternalFieldBlock?.[0]?.href);
  const productInternalFieldBlockID = productInternalFieldBlock?.[0]?.id;

  useEffect(() => {
    if (productInternalFieldBlockUID && productInternalFieldBlockID) {
      fetchData({
        url: productInternalFieldBlockUID,
        params: {},
        id: productInternalFieldBlockID,
      }).then(({ data }) => {
        setProductInternalData({
          content: `<h2>${formatMessage({
            id: getTrad('productInternalFieldBlock.title'),
            defaultMessage: 'Interne informatie',
          })}</h2> ${concatenateFieldValues(data?.content?.contentBlock)}`,
        });
      });
    }
  }, [productInternalFieldBlockUID, productInternalFieldBlockID]);

  useEffect(() => {
    if (additionalInformationUid && additionalInformationId) {
      fetchData({
        url: additionalInformationUid,
        params: {},
        id: additionalInformationId,
      }).then(({ data }) => {
        setAdditionalInformation(data?.content?.contentBlock);
      });
    }
  }, [additionalInformationUid]);
  const sections = data.initialData?.sections ?? [];
  const processedData = processProductData({
    data: [
      {
        content: data.initialData?.content,
        kennisartikelCategorie: 'inleiding',
        __component: 'components.utrecht-rich-text',
      },
      ...sections,
    ],
    locale: 'nl',
    priceData,
    url,
  });
  const template =
    '<div class="utrecht-additional-information utrecht-spotlight-section"><hr/><h2>{title}</h2>{content}<hr/></div>';
  const additionalContent = addHeadingOncePerCategory({
    contentBlocks: additionalInformation ?? [],
    title: 'Aanvullende informatie',
    categoryKey: 'kennisartikelCategorie',
    template,
  });
  const combinedContent = combineSimilarCategories([...processedData, ...additionalContent]);

  const content = getContentByType({
    vac: {
      content: <Content data={vacData.content} title={vacData?.title} {...contentComponentProps} />,
    },
    internalField: {
      content: (
        <Content
          data={data?.initialData?.content?.contentBlock}
          title={data?.initialData?.title}
          {...contentComponentProps}
        />
      ),
      id: data.initialData?.product?.[0]?.id,
    },
    additionalInformation: {
      content: (
        <Content
          data={data?.initialData?.content?.contentBlock}
          title={data?.initialData?.title}
          {...contentComponentProps}
        />
      ),
      id: data.initialData?.product?.[0]?.id,
    },
    products: {
      content: (
        <Content
          data={[...combinedContent, ...[productInternalData]]}
          title={data?.initialData?.title}
          {...contentComponentProps}
        />
      ),
      id: data.initialData?.id,
    },
    type,
  });

  const productId = content?.id;
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
  useEffect(() => {
    if (productId) {
      Promise.all([
        fetchData({
          url: '/content-manager/collection-types/api::product.product',
          params: { price: { populate: ['*'] } },
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

  const previewUrl = getPreviewUrl({
    url,
    token: config.data.token,
    type: isPreviewSupported.query.type,
    slug: data.initialData.slug,
    locale: data.initialData.locale,
  });
  return (
    <>
      {previewOptions.dialog && (
        <DialogPreviewButton
          dialog={{
            ref: dialogRef,
            title: formatMessage({ id: getTrad('dialog.title'), defaultMessage: 'Bekijken' }),
            closeButton: { onClick: close },
            endAction: {
              onClick: onClickCopyHTMLToDocxHandler,
              label: formatMessage({ id: getTrad(clipboardStatus), defaultMessage: 'Copy' }),
            },
            startAction: {
              label: formatMessage({ id: getTrad('button.cancelPreview'), defaultMessage: 'Sluiten' }),
              onClick: close,
            },
            body: content?.data,
          }}
          previewButton={{
            onClick: openDialog,
            label: previewInDialogButtonLabel,
          }}
        />
      )}
      {previewOptions.page && (
        <LinkButton
          size="S"
          startIcon={<Eye />}
          className="utrecht-preview-link"
          href={previewUrl?.href}
          target="_blank"
          rel="noopener noreferrer"
          title={previewInPageButtonLabel}
          aria-label={previewInPageButtonLabel}
        >
          {previewInPageButtonLabel}
        </LinkButton>
      )}
    </>
  );
};

export default PreviewLink;
