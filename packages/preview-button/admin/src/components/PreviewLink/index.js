/* eslint-disable no-console */
import { useDialog } from '@frameless/ui';
import { addHeadingOncePerCategory } from '@frameless/utils';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { useCMEditViewDataManager, useFetchClient } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import React, { useEffect, useReducer, useState } from 'react';
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
  const isPreviewSupported = contentTypes.find((type) => type.uid === data?.layout?.uid);

  const type = isPreviewSupported?.query?.type;
  const previewType = isPreviewSupported?.preview?.type || 'page';
  const showDialog = previewType === 'dialog' || previewType === 'both';
  const showPage = previewType === 'page' || previewType === 'both';

  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    additionalInformationData: null,
    vacData: null,
    internalFieldData: null,
    productData: null,
  });

  const [clipboardStatus, setClipboardStatus] = useState('button.copy');
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
  };

  const url = getUrl(config?.data?.domain);

  const isVacType = type === 'vac';
  const isInternalFieldType = type === 'internal-field';
  const isProductType = type === 'products';
  const isAdditionalInformationType = type === 'additional-information';
  const contentId = data.initialData?.id;

  useEffect(() => {
    if (!isProductType || !contentId || !isPreviewSupported?.uid) return;

    const fetchProductData = async () => {
      try {
        const response = await fetchData(`/preview-button/product/${contentId}?uid=${isPreviewSupported.uid}`);
        const productData = response.data.data;
        dispatch({ productData });

        // Set additional information from product data
        if (productData?.additional_information?.content) {
          dispatch({
            additionalInformationData: {
              contentBlock: productData.additional_information.content.contentBlock,
            },
          });
        }
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      }
    };

    fetchProductData();
  }, [isProductType, contentId, isPreviewSupported?.uid, fetchData, data.modifiedData]);

  useEffect(() => {
    if (!isAdditionalInformationType || !contentId || !isPreviewSupported?.uid) return;

    const fetchAdditionalInfo = async () => {
      try {
        const response = await fetchData(
          `/preview-button/additional-information/${contentId}?uid=${isPreviewSupported.uid}`,
        );
        dispatch({ additionalInformationData: response.data.data });
      } catch (error) {
        console.error('Failed to fetch additional information:', error);
      }
    };

    fetchAdditionalInfo();
  }, [isAdditionalInformationType, contentId, isPreviewSupported?.uid, fetchData, data.modifiedData]);

  useEffect(() => {
    if (!isVacType || !contentId || !isPreviewSupported?.uid) return;

    const fetchVacData = async () => {
      try {
        const response = await fetchData(`/preview-button/vac/${contentId}?uid=${isPreviewSupported.uid}`);
        dispatch({ vacData: response.data.data });
      } catch (error) {
        console.error('Failed to fetch VAC data:', error);
      }
    };

    fetchVacData();
  }, [isVacType, contentId, isPreviewSupported?.uid, fetchData, data.modifiedData]);

  useEffect(() => {
    if (!isInternalFieldType || !contentId || !isPreviewSupported?.uid) return;

    const fetchInternalFieldData = async () => {
      try {
        const response = await fetchData(`/preview-button/internal-field/${contentId}?uid=${isPreviewSupported.uid}`);
        dispatch({ internalFieldData: response.data.data });
      } catch (error) {
        console.error('Failed to fetch internal-field data:', error);
      }
    };

    fetchInternalFieldData();
  }, [isInternalFieldType, contentId, isPreviewSupported?.uid, fetchData, data.modifiedData]);

  const productInternalData = state.productData?.internalFieldData?.content
    ? {
        content: `<h2>${formatMessage({
          id: getTrad('productInternalFieldBlock.title'),
          defaultMessage: 'Interne informatie',
        })}</h2> ${concatenateFieldValues(state.productData.internalFieldData.content)}`,
      }
    : null;

  const processedData = processProductData({
    data: state.productData?.sections || [],
    locale: 'nl',
    priceData: state.productData?.price?.price,
    url,
  });

  const additionalContent = addHeadingOncePerCategory({
    contentBlocks: combineSimilarCategories(state.additionalInformationData?.contentBlock || []),
    title: 'Aanvullende informatie',
    categoryKey: 'kennisartikelCategorie',
    template:
      '<div class="utrecht-additional-information utrecht-spotlight-section"><hr/><h2>{title}</h2>{content}<hr/></div>',
  });

  const combinedContent = combineSimilarCategories([...processedData, ...additionalContent]);
  console.log(state.productData?.sections);

  const content = getContentByType({
    vac: {
      content: (
        <Content
          data={state.vacData?.mergedContent || []}
          title={state.vacData?.title || data.initialData?.title}
          {...contentComponentProps}
        />
      ),
    },
    internalField: {
      content: (
        <Content
          data={state.internalFieldData?.mergedContent || []}
          title={state.internalFieldData?.title || data?.initialData?.title}
          priceData={state.internalFieldData?.product?.price?.price || []}
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
          priceData={state.additionalInformationData?.product?.price?.price || []}
          {...contentComponentProps}
        />
      ),
      id: data.initialData?.product?.[0]?.id,
    },
    products: {
      content: (
        <Content
          data={[...combinedContent, productInternalData].filter(Boolean)}
          title={state.productData?.title || data?.initialData?.title}
          priceData={state.productData?.price?.price || []}
          {...contentComponentProps}
        />
      ),
      id: data.initialData?.id,
    },
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
    setTimeout(() => setClipboardStatus('button.copy'), 1000);
  };

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
      {showDialog && (
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
      {showPage && (
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
