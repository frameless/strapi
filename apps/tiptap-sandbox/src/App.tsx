import { Editor } from '@frameless/tiptap-editor';
import { useState } from 'react';
import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';
import '@frameless/tiptap-editor/dist/tiptap.css';
import 'tippy.js/dist/tippy.css';
import '@frameless/ui/dist/bundle.css';

const App = () => {
  const [locale, setLocale] = useState('en');

  return (
    <div className="utrecht-app">
      <select value={locale} onChange={(e) => setLocale(e.target.value)} style={{ marginBlock: '1.5rem' }}>
        <option value="">Select Language</option>
        <option value="en">English</option>
        <option value="nl">Dutch</option>
      </select>
      <Editor
        locale={locale}
        name="tiptap-editor"
        onEditorChangeHandler={(content) => {
          localStorage.setItem('content', content ?? '');
        }}
        value={localStorage.getItem('content') ?? ''}
        intlLabel={'Label'}
        labelAction={undefined}
        className="utrecht-theme utrecht-theme--media-query-color-scheme utrecht-html utrecht-document"
        error={'Error'}
        description={undefined}
        required={false}
        settings={{
          price: {
            enabled: true,
            data: {
              title: 'Product prices list',
              price: [
                {
                  currency: 'EUR',
                  label: 'Product 1',
                  uuid: 'C68FC92B-A3CD-43BF-947A-09A04AFBF990',
                  value: 20,
                },
                {
                  currency: 'EUR',
                  label: 'Product 2',
                  uuid: 'C7F8F7DC-9205-4A33-A2E2-9B49379E2E1F',
                  value: 30,
                },
                {
                  currency: 'EUR',
                  label: 'Product 3',
                  uuid: '899CFE0A-A98A-43E6-96CC-9A23F8B2B874',
                  value: 40,
                },
                {
                  currency: 'EUR',
                  label: 'Product 4',
                  uuid: '3FE0CCB9-C8FC-404E-B714-59A17155DE08',
                  value: 50,
                },
                {
                  currency: 'EUR',
                  label: 'Product 5',
                  uuid: '40200BAB-F296-49DA-9861-57449840C4F8',
                  value: 60,
                },
              ],
            },
          },
          headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          bold: true,
          italic: true,
          strikethrough: true,
          underline: true,
          code: true,
          blockquote: true,
          highlight: true,
          align: ['center', 'left', 'right'],
          lists: ['ul', 'ol'],
          disableOrderedListShorthand: false,
          table: true,
          horizontal: true,
          links: {
            enabled: true,
            autolink: false,
            openOnClick: false,
            linkOnPaste: true,
            relAttribute: false,
            HTMLAttributes: {
              rel: '',
            },
          },
          image: {
            enabled: true,
            inline: true,
            allowBase64: true,
          },
          other: {
            wordcount: true, //TODO test this option after integrate the Editor
            language: {
              enabled: true,
              default: [
                {
                  name: 'Engles',
                  code: 'en',
                },
                {
                  name: 'Arabisch',
                  code: 'ar',
                },
                {
                  name: 'Ukrainisch',
                  code: 'uk',
                },
                {
                  name: 'Turks',
                  code: 'tr',
                },
                {
                  name: 'Nederlandse',
                  code: 'nl',
                },
              ],
            },
          },
          youtube: {
            enabled: true,
            height: 400,
            width: 400,
          },
        }}
      />
    </div>
  );
};
export default App;
