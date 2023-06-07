import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  UnorderedList,
  UnorderedListItem,
  Link as UtrechtLink,
} from '@utrecht/component-library-react/dist/css-module';
import Link from 'next/link';
// TODO IMPROVE THIS PAGE
export default function NotFound() {
  return (
    <div>
      <Heading1>Pagina niet gevonden (404)</Heading1>
      <Heading2>Sorry, deze pagina bestaat helaas niet (meer)</Heading2>
      <Paragraph>
        Go back to the{' '}
        <Link className="utrecht-link" href="/">
          Home page
        </Link>
      </Paragraph>

      <Heading3>Dit kunt u proberen</Heading3>
      <UnorderedList>
        <UnorderedListItem>Controleer of u het juiste webadres hebt gebruikt</UnorderedListItem>
        <UnorderedListItem>Gebruik het zoekvenster (rechtsboven op elke pagina)</UnorderedListItem>
        <UnorderedListItem>
          Ga naar de{' '}
          <Link className="utrecht-link" href="/">
            homepage
          </Link>
        </UnorderedListItem>
        <UnorderedListItem>
          Probeer de pagina te bereiken via de{' '}
          <Link className="utrecht-link" href="/sitemap.xml">
            sitemap
          </Link>
          &nbsp;
        </UnorderedListItem>
        <UnorderedListItem>
          Zoek in het
          <UtrechtLink
            href="https://www.utrecht.nl/over-deze-website/webarchief/"
            rel="external noopener noreferrer"
            title="naar het webarchief"
            external
          >
            webarchief
          </UtrechtLink>
          naar oude pagina&apos;s
        </UnorderedListItem>
      </UnorderedList>
    </div>
  );
}
