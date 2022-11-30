import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@strapi/design-system';
import ClassicEditor from '@frameless/utrecht-editor';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router';

import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';

import { ProductPriceList, formatCurrency } from '../ProductPrice';

const Wrapper = styled(Box)`
  .ck-editor__main {
    min-height: ${200 / 16}em;
    > div {
      min-height: ${200 / 16}em;
    }
    > textarea {
      width: 100%;
    }
  }
  .ck-content span[lang] {
    /* undo italic styling from CK Editor */
    font-style: inherit !important;
  }
  .utrecht-spotlight-section > :first-child {
    --utrecht-space-around: 0;
  }
`;
function Editor({ onChange, name, value, disabled }) {
  const [productPrice, setProductPrice] = React.useState([]);
  const [editor, setEditor] = React.useState([]);
  const [priceValue, setPriceValue] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const params = Object.fromEntries(urlSearchParams.entries());
  // const languageContent = params["plugins[i18n][locale]"];
  const { id: pageId } = useParams();

  const configuration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'textPartLanguage',
      'sourceEditing',
      'htmlEmbed',
      'simpleBox',
      'spotlight',
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'utrecht-paragraph' },
        {
          model: 'paragraphLead',
          view: {
            name: 'paragraph',
            classes: 'utrecht-paragraph utrecht-paragraph--lead',
          },
          title: 'Paragraph Lead',
          class: 'utrecht-paragraph utrecht-paragraph--lead',
          converterPriority: 'high',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'utrecht-heading-1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'utrecht-heading-2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'utrecht-heading-3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'utrecht-heading-4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'utrecht-heading-5',
        },
      ],
    },
    link: {
      options: [{ model: 'link', view: 'a', title: 'Link', class: 'utrecht-link' }],
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      },
    },
    language: {
      textPartLanguage: [
        { title: 'Arabic', languageCode: 'ar' },
        { title: 'Dutch', languageCode: 'nl' },
        { title: 'English', languageCode: 'en' },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
        },
      ],
      disallow: ['style'],
    },
    htmlEmbed: {
      showPreviews: true,
    },
    products: {
      productRenderer: async (id, domElement) => {
        const product = productPrice?.price?.find((price) => parseInt(price.id) === parseInt(id));
        ReactDOM.render(product?.currency ? <p id={id}>{formatCurrency(product)}</p> : null, domElement);
      },
    },
    fillEmptyBlocks: false,
  };

  const fetchProductPrice = async () => {
    try {
      setBusy(true);
      const res = await fetch(STRAPI_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            product(id:${pageId}){
              data {
                id
                attributes{
                  price {
                    data {
                      attributes {
                        title
                        price {
                          id
                          currency
                          label
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
              }`,
        }),
      });
      const { data } = await res.json();

      setProductPrice(data.product.data?.attributes?.price?.data?.attributes || []);
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  React.useEffect(() => {
    fetchProductPrice();
  }, [pageId]);
  return (
    <>
      <ProductPriceList
        onChange={(evt) => {
          const id = evt.target.value;
          setPriceValue(id);
          if (id) {
            editor.execute('insertProduct', id);
            editor.editing.view.focus();
          }
        }}
        label={productPrice.title}
        products={productPrice.price}
        selectedValue={priceValue}
      />
      <Wrapper className={['utrecht-theme', 'utrecht-html'].join(' ')}>
        {!busy && (
          <CKEditor
            editor={ClassicEditor}
            disabled={disabled}
            config={configuration}
            data={value || ''}
            onReady={(editor) => {
              editor.setData(value || '');
              setEditor(editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange({ target: { name, value: data } });
            }}
          />
        )}
      </Wrapper>
    </>
  );
}

Editor.defaultProps = {
  value: '',
  disabled: false,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Editor;
