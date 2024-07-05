import { Editor } from '@frameless/tiptap-editor';
import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';
import '@frameless/tiptap-editor/dist/tiptap.css';
const App = () => {
  return (
    <div className="utrecht-app">
      <Editor
        name="tiptap-editor"
        onEditorChangeHandler={(content) => {
          // eslint-disable-next-line no-console
          console.log(content);
        }}
        // value={'dddd'}
        intlLabel={'Label'}
        labelAction={'Hello'}
        className="utrecht-theme utrecht-theme--media-query-color-scheme utrecht-html utrecht-document"
        error={'Error'}
        description={undefined}
        required={false}
        settings={{
          price: {
            enabled: true,
            data: {
              title: 'test',
              price: [
                {
                  currency: 'EUR',
                  label: 'Visa',
                  uuid: 'C68FC92B-A3CD-43BF-947A-09A04AFBF990',
                  value: 20,
                },
                {
                  currency: 'EUR',
                  label: 'Hotel',
                  uuid: 'C7F8F7DC-9205-4A33-A2E2-9B49379E2E1F',
                  value: 30,
                },
                {
                  currency: 'EUR',
                  label: 'Flight',
                  uuid: '899CFE0A-A98A-43E6-96CC-9A23F8B2B874',
                  value: 40,
                },
                {
                  currency: 'EUR',
                  label: 'Car',
                  uuid: '3FE0CCB9-C8FC-404E-B714-59A17155DE08',
                  value: 50,
                },
                {
                  currency: 'EUR',
                  label: 'Meal',
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
