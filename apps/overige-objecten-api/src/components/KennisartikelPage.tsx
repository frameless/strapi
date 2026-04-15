import { Markdown } from '@frameless/ui';
import { Button, Heading } from '@utrecht/component-library-react';
import { useState } from 'react';

import type { BaseObject, KennisartikelData, KennisartikelTranslation } from '../types';

interface KennisartikelPageProps {
  data: BaseObject<KennisartikelData>;
  showAllCategories?: boolean; // NEW PROP
}

const categories = [
  { key: 'inleiding', label: 'Inleiding' },
  { key: 'procedure', label: 'Aanvraag' },
  { key: 'kosten', label: 'Kosten' },
  { key: 'contact', label: 'Contact' },
  { key: 'bewijs', label: 'Bewijs' },
  { key: 'voorwaarden', label: 'Voorwaarden' },
  { key: 'bezwaarEnBeroep', label: 'Bezwaar' },
  { key: 'wtdBijGeenReactie', label: 'Geen reactie' },
  { key: 'notice', label: 'Bijzonderheden' },
  { key: 'uitersteTermijn', label: 'Termijn' },
  { key: 'deskMemo', label: 'KCC' },
];

const KennisartikelPage = ({ data, showAllCategories = false }: KennisartikelPageProps) => {
  const [currentCategory, setCurrentCategory] = useState('inleiding');
  const content: KennisartikelTranslation = data?.record?.data?.vertalingen?.[0] || {
    taal: '',
    titel: '',
    datumWijziging: '',
    trefwoorden: [],
  };

  const htmlMap: Record<string, string | undefined> = {
    inleiding: content?.tekst,
    procedure: content?.procedureBeschrijving,
    kosten: content?.kostenEnBetaalmethoden,
    contact: content?.contact,
    bewijs: content?.bewijs,
    voorwaarden: content?.vereisten,
    bezwaarEnBeroep: content?.bezwaarEnBeroep,
    wtdBijGeenReactie: content?.wtdBijGeenReactie,
    notice: content?.notice,
    uitersteTermijn: content?.uitersteTermijn,
    deskMemo: content?.deskMemo,
  };

  if (showAllCategories) {
    // Render all categories
    return (
      <div className="utrecht-preview-page utrecht-page-content">
        <main className="utrecht-preview-content utrecht-html utrecht-richtext">
          <Heading level={1}>{content.titel}</Heading>
          {categories.map((category) => {
            const text = htmlMap[category.key];
            if (!text) return null;
            return (
              <section key={category.key} style={{ marginBottom: '2rem' }}>
                <Heading level={2}>{category.label}</Heading>
                <Markdown>{text}</Markdown>
              </section>
            );
          })}
        </main>
      </div>
    );
  }

  // Default single-category mode
  return (
    <div className="utrecht-preview-page utrecht-page-content">
      <aside className="utrecht-preview-sidebar">
        <Heading level={2}>Categorieën</Heading>
        <nav className="utrecht-preview-sidebar__nav">
          {categories.map((category) => (
            <Button
              appearance="secondary-action-button"
              key={category.key}
              className={currentCategory === category.key ? ' utrecht-preview-sidebar__button--current' : ''}
              onClick={() => setCurrentCategory(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="utrecht-preview-content utrecht-html utrecht-richtext">
        <Heading level={1}>{content.titel}</Heading>
        {htmlMap[currentCategory] && <Markdown>{htmlMap[currentCategory] ?? ''}</Markdown>}
      </main>
    </div>
  );
};

export default KennisartikelPage;
