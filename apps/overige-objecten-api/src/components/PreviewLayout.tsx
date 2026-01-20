import { Button, ButtonGroup } from '@utrecht/component-library-react';
import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import KennisartikelPage from './KennisartikelPage';
import VacPage from './VacPage';
import useCopyHTMLToClipboard from '../client/hooks/useCopyHTMLToClipboard';
import { HTMLTemplate } from '../utils/HTMLTemplate';
interface PreviewLayoutProps {
  status?: 'DRAFT' | 'PUBLISHED';
  children: React.ReactNode;
}

export const PreviewLayout = ({ status, children }: PreviewLayoutProps) => {
  const [clipboardStatus, setClipboardStatus] = useState('Kopiëren');
  const copyHTMLToClipboard = useCopyHTMLToClipboard();

  const handleCopy = async () => {
    try {
      setClipboardStatus('Gekopieerd!');
      await copyHTMLToClipboard(
        renderToString(
          <HTMLTemplate title="Preview" lang="nl">
            {window.__KENNISARTIKEL_PREVIEW_DATA__ && (
              <KennisartikelPage showAllCategories data={window.__KENNISARTIKEL_PREVIEW_DATA__} />
            )}
            {window.__VAC_PREVIEW_DATA__ && <VacPage data={window.__VAC_PREVIEW_DATA__} />}
          </HTMLTemplate>,
        ),
      );
      setTimeout(() => setClipboardStatus('Kopiëren'), 1000);
    } catch (err) {
      setClipboardStatus('Kopiëren');
      // eslint-disable-next-line no-console
      console.error('Failed to copy preview HTML', err);
    }
  };

  return (
    <div className="utrecht-preview-layout">
      <ButtonGroup className="utrecht-preview-layout__header">
        {status && (
          <span className={`utrecht-status-badge utrecht-status-badge--${status === 'DRAFT' ? 'warning' : 'success'}`}>
            {status === 'DRAFT' ? 'Concept' : 'Gepubliceerd'}
          </span>
        )}
        {!window.__ERROR_PAGE_DATA__ && (
          <Button appearance="primary-action-button" type="button" onClick={handleCopy}>
            {clipboardStatus}
          </Button>
        )}
      </ButtonGroup>

      {children}
    </div>
  );
};
