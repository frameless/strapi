import { JSDOM } from 'jsdom';
import { processData } from './processData';
import type { Price } from '../strapi-product-type';

describe('processData', () => {
  describe('ComponentComponentsUtrechtRichText', () => {
    it('should process basic rich text content and mapped the category correctly', () => {
      const data = [
        {
          id: '443',
          content:
            '<h2>Contentblok</h2> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>',
          kennisartikelCategorie: 'inleiding',
          component: 'ComponentComponentsUtrechtRichText',
          categorie: 'inleiding',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].tekst;
      const dom = new JSDOM(outputHtml);
      const h2Element = dom.window.document.querySelector('h2') as any;
      expect(h2Element).not.toBeNull();
      expect(h2Element.textContent).toBe('Contentblok');
      const pElement = dom.window.document.querySelector('p') as any;
      expect(pElement).not.toBeNull();
      expect(pElement.textContent).toBe('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
    });
    it('should render price widget with the correct category when it provided', () => {
      const data = [
        {
          id: '446',
          content:
            '<h2>Kosten</h2><p><span data-strapi-idref="7395d0a3-c3b3-4951-9fd5-1c8e654ba391" data-strapi-category="price"></span></p>',
          kennisartikelCategorie: 'kosten',
          component: 'ComponentComponentsUtrechtRichText',
          categorie: 'kosten',
        },
      ];
      const priceData: Price[] = [
        {
          currency: 'EUR',
          label: 'Example-1',
          uuid: '7395d0a3-c3b3-4951-9fd5-1c8e654ba391',
          value: '10',
        },
      ];
      const result = processData({ data, priceData });

      const outputHtml = result[0].kostenEnBetaalmethoden;

      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const spanElement = dom.window.document.querySelector('span') as any;
      expect(spanElement).not.toBeNull();
      expect(spanElement.getAttribute('dataStrapiCategory')).toBe('price');
      expect(spanElement.getAttribute('dataStrapiIdref')).toBe('7395d0a3-c3b3-4951-9fd5-1c8e654ba391');
      expect(spanElement.textContent.trim()).toMatch(/€\s?10,00/);
    });
    it('should render Embed YouTube when provided', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtRichText',
          categorie: 'inleiding',
          content:
            '<div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/OEIplofZ0bQ" start="0" data-title="Test"></iframe></div>',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].tekst;

      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const iframeElement = dom.window.document.querySelector('iframe') as HTMLIFrameElement;
      expect(iframeElement).not.toBeNull();
      expect(iframeElement.getAttribute('src')).toBe(
        'https://www.youtube.com/embed/OEIplofZ0bQ?disablekb=1&loop=false',
      );
      expect(iframeElement.getAttribute('aria-label')).toBe('Test');
      expect(iframeElement.getAttribute('width')).toBe('640');
      expect(iframeElement.getAttribute('height')).toBe('480');
    });
    it('should render <img/> when provided', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtRichText',
          categorie: 'inleiding',
          content: '<p><img src="https://example.com/image.jpg" alt="Example image" /></p>',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].tekst;

      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const imgElement = dom.window.document.querySelector('img') as HTMLImageElement;
      expect(imgElement).not.toBeNull();
      expect(imgElement.getAttribute('src')).toBe('https://example.com/image.jpg');
      expect(imgElement.getAttribute('alt')).toBe('Example image');
    });
  });
  describe('ComponentComponentsUtrechtLogoButton', () => {
    it('renders the logo button without a logo when no logo is provided', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtLogoButton',
          appearance: 'primary_action_button',
          href: 'https://example.com',
          openFormsEmbed: null,
          textContent: 'Inloggen me DigiD',
          categorie: 'contact',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].contact;
      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);

      const anchorElement = dom.window.document.querySelector('a') as HTMLAnchorElement;
      expect(anchorElement).not.toBeNull();
      expect(anchorElement.getAttribute('href')).toBe('https://example.com');
      expect(anchorElement.textContent).toBe('Inloggen me DigiD');
      const spanElement = dom.window.document.querySelector('span') as HTMLSpanElement;
      expect(spanElement).toBeNull();
    });
    it('renders the logo button with a logo when a logo is provided', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtLogoButton',
          appearance: 'primary_action_button',
          href: 'https://example.com',
          label: 'DigiD',
          logo: 'digid',
          openFormsEmbed: null,
          textContent: 'Inloggen me DigiD',
          categorie: 'contact',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].contact;
      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const anchorElement = dom.window.document.querySelector('a') as HTMLAnchorElement;
      expect(anchorElement).not.toBeNull();
      expect(anchorElement.getAttribute('href')).toBe('https://example.com');
      const spanElement = dom.window.document.querySelector('span') as HTMLSpanElement;
      expect(spanElement).not.toBeNull();
      expect(spanElement.textContent).toBe('DigiD');
      const h3Element = dom.window.document.querySelector('h3') as HTMLHeadingElement;
      expect(h3Element).not.toBeNull();
      expect(h3Element.textContent).toBe('DigiD');
    });
    it('should render logo button with openFormsEmbed when the value is provided', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtLogoButton',
          appearance: 'primary_action_button',
          href: null,
          label: null,
          logo: 'digid',
          openFormsEmbed:
            'uuid=7e6cc160-a3b5-4cca-9d88-f8a361df2e3f&slug=paspoort-aanvraag&label=Paspoort+aanvraag&embed_url=http%3A%2F%2Flocalhost%3A3000',
          textContent: null,
          categorie: 'contact',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].contact;
      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const anchorElement = dom.window.document.querySelector('a') as HTMLAnchorElement;
      expect(anchorElement).not.toBeNull();
      expect(anchorElement.getAttribute('href')).toBe('http://localhost:3000/form/paspoort-aanvraag');
      expect(anchorElement.textContent).toBe('Paspoort aanvraag');
      const spanElement = dom.window.document.querySelector('span') as HTMLSpanElement;
      expect(spanElement).not.toBeNull();
      expect(spanElement.textContent).toBe('DigiD');
    });
  });

  describe('should process ComponentComponentsUtrechtSpotlight component', () => {
    it('should render spotlight component', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtSpotlight',
          content:
            '<h2>Spotlightblok </h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>',
          type: 'gray',
          logoButton: [
            {
              component: 'ComponentComponentsUtrechtLogoButton',
              appearance: 'primary_action_button',
              href: 'https://example.com',
              label: 'DigiD',
              logo: 'digid',
              openFormsEmbed: null,
              textContent: 'Inloggen me DigiD',
              categorie: 'bewijs',
            },
          ],
          categorie: 'bewijs',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].bewijs;
      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const sectionElement = dom.window.document.querySelector('figure');
      expect(sectionElement).not.toBeNull();
      const h2Element = dom.window.document.querySelector('h2') as HTMLHeadingElement;
      expect(h2Element).not.toBeNull();
      expect(h2Element.textContent).toBe('Spotlightblok ');
      const pElement = dom.window.document.querySelector('p') as HTMLParagraphElement;
      expect(pElement).not.toBeNull();
      expect(pElement.textContent).toBe('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
    });
    it('should render spotlight component with logo button', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtSpotlight',
          content:
            '<h2>Spotlightblok </h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>',
          type: 'gray',
          logoButton: [
            {
              component: 'ComponentComponentsUtrechtLogoButton',
              appearance: 'primary_action_button',
              href: 'https://example.com',
              label: 'DigiD',
              logo: 'digid',
              openFormsEmbed: null,
              textContent: 'Inloggen me DigiD',
              categorie: 'bewijs',
            },
          ],
          categorie: 'bewijs',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].bewijs;
      // Parse the HTML using JSDOM
      const dom = new JSDOM(outputHtml);
      const sectionElement = dom.window.document.querySelector('figure');
      expect(sectionElement).not.toBeNull();
      const h2Element = dom.window.document.querySelector('h2') as HTMLHeadingElement;
      expect(h2Element).not.toBeNull();
      expect(h2Element.textContent).toBe('Spotlightblok ');
      const pElement = dom.window.document.querySelector('p') as HTMLParagraphElement;
      expect(pElement).not.toBeNull();
      expect(pElement.textContent).toBe('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
      const spanElement = dom.window.document.querySelector('span') as HTMLSpanElement;
      expect(spanElement).not.toBeNull();
      expect(spanElement.textContent).toBe('DigiD');
      const aElement = dom.window.document.querySelector('a') as HTMLAnchorElement;
      expect(aElement).not.toBeNull();
      expect(aElement.textContent).toBe('Inloggen me DigiD');
    });
  });

  it('should process ComponentComponentsUtrechtImage component', () => {
    const data = [
      {
        component: 'ComponentComponentsUtrechtImage',
        imageData: {
          data: {
            attributes: {
              name: 'alex-dudar-5k_nosY4vIQ-unsplash.jpg',
              alternativeText: 'Test Alternative text',
              caption: null,
              width: 1920,
              height: 2856,
              url: '/uploads/alex_dudar_5k_nos_Y4v_IQ_unsplash_0a859bed10.jpg',
            },
          },
        },
        categorie: 'contact',
      },
    ];
    process.env.STRAPI_PRIVATE_URL = 'http://example.com';
    const result = processData({ data });
    const outputHtml = result[0].contact;
    const dom = new JSDOM(outputHtml);
    const imgElement = dom.window.document.querySelector('img') as HTMLImageElement;
    expect(imgElement).not.toBeNull();
    expect(imgElement.getAttribute('src')).toBe(
      'http://example.com/uploads/alex_dudar_5k_nos_Y4v_IQ_unsplash_0a859bed10.jpg',
    );
    expect(imgElement.getAttribute('alt')).toBe('Test Alternative text');
  });

  it('should process ComponentComponentsFaq component', () => {
    const data = [
      {
        component: 'ComponentComponentsFaq',
        pdc_faq: {
          data: {
            attributes: {
              title: 'Demo FAQ ',
              faq: [
                {
                  body: '<p>FAQ Inhoud</p>',
                  headingLevel: 2,
                  id: 1,
                  label: 'FAQ Title',
                },
              ],
            },
          },
        },
        categorie: 'bijzonderheden',
      },
    ];
    const result = processData({ data });
    const outputHtml = result[0].notice;
    const dom = new JSDOM(outputHtml);
    const detailsElement = dom.window.document.querySelector('details');
    const summaryElement = detailsElement?.querySelector('summary');
    const detailsContentElement = detailsElement?.querySelector('div');
    const paragraphElement = detailsContentElement?.querySelector('p');
    const heading = summaryElement?.querySelector('h2');

    expect(heading?.textContent).toBe('FAQ Title');
    expect(heading).not.toBeNull();
    expect(paragraphElement).not.toBeNull();
    expect(paragraphElement?.textContent).toBe('FAQ Inhoud');
    expect(detailsElement).not.toBeNull();
  });

  describe('ComponentComponentsUtrechtLink', () => {
    it('should render anchor tag', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtLink',
          href: 'https://example.com',
          textContent: 'Click here',
          icon: 'arrow',
          categorie: 'wat_te_doen_bij_geen_reactie',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].wtdBijGeenReactie;
      const dom = new JSDOM(outputHtml);
      const aElement = dom.window.document.querySelector('a') as HTMLAnchorElement;
      expect(aElement).not.toBeNull();
      expect(aElement.getAttribute('href')).toBe('https://example.com');
      expect(aElement.textContent).toBe('Click here');
      expect(aElement.getAttribute('dir')).toBe(null);
      expect(aElement.getAttribute('lang')).toBe(null);
    });
    it('should render anchor tag from right to left when the language is arabic', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtLink',
          href: 'https://example.com',
          textContent: 'انقر هنا',
          language: 'ar',
          categorie: 'wat_te_doen_bij_geen_reactie',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].wtdBijGeenReactie;
      const dom = new JSDOM(outputHtml);
      const aElement = dom.window.document.querySelector('a') as HTMLAnchorElement;
      expect(aElement).not.toBeNull();
      expect(aElement.getAttribute('href')).toBe('https://example.com');
      expect(aElement.textContent).toBe('انقر هنا');
      expect(aElement.getAttribute('dir')).toBe('rtl');
      expect(aElement.getAttribute('lang')).toBe('ar');
    });
  });
  describe('ComponentComponentsUtrechtAccordion', () => {
    it('Should render the Accordion component as a <details> and display the body as rich text.', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtAccordion',
          item: [
            {
              body: '<p>Uitklapmenu inhoud voorbeeld 1</p>',
              id: '3',
              label: 'Uitklapmenu kop voorbeeld 1',
            },
            {
              body: '<p>Uitklapmenu inhoud voorbeeld 2</p>',
              id: '4',
              label: 'Uitklapmenu kop voorbeeld 2',
            },
          ],
          categorie: 'voorwaarden',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].vereisten;
      const dom = new JSDOM(outputHtml);
      const detailsElements = dom.window.document.querySelectorAll('details');
      const summaryElement = detailsElements[0]?.querySelector('summary');
      const detailsContentElement = detailsElements[0]?.querySelector('div');
      const paragraphElement = detailsContentElement?.querySelector('p');

      expect(paragraphElement).not.toBeNull();
      expect(detailsElements.length).toBe(2);
      expect(paragraphElement?.textContent).toBe('Uitklapmenu inhoud voorbeeld 1');
      expect(summaryElement).not.toBeNull();
      expect(summaryElement?.textContent).toBe('Uitklapmenu kop voorbeeld 1');
      expect(detailsElements[0]).not.toBeNull();
      expect(detailsElements[0]?.childElementCount).toBe(2);
    });
    it('should render the Accordion component as a <details> with an adjustable heading when headingLevel is provided and display the body as rich text.', () => {
      const data = [
        {
          component: 'ComponentComponentsUtrechtAccordion',
          item: [
            {
              body: '<p>Uitklapmenu inhoud voorbeeld 1</p>',
              headingLevel: 3,
              id: '3',
              label: 'Uitklapmenu kop voorbeeld 1',
            },
            {
              body: '<p>Uitklapmenu inhoud voorbeeld 2</p>',
              headingLevel: 3,
              id: '4',
              label: 'Uitklapmenu kop voorbeeld 2',
            },
          ],
          categorie: 'voorwaarden',
        },
      ];
      const result = processData({ data });
      const outputHtml = result[0].vereisten;
      const dom = new JSDOM(outputHtml);
      const detailsElement = dom.window.document.querySelectorAll('details');
      const summaryElement = detailsElement[0]?.querySelector('summary');
      const headingElement = summaryElement?.querySelector('h3');
      const detailsContentElement = detailsElement[0]?.querySelector('div');
      const paragraphElement = detailsContentElement?.querySelector('p');

      expect(paragraphElement).not.toBeNull();
      expect(paragraphElement?.textContent).toBe('Uitklapmenu inhoud voorbeeld 1');
      expect(headingElement).not.toBeNull();
      expect(headingElement?.textContent).toBe('Uitklapmenu kop voorbeeld 1');
      expect(detailsElement).not.toBeNull();
      expect(detailsElement.length).toBe(2);
    });
  });
});
