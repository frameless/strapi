import { Button, ButtonGroup, Heading, Paragraph } from '@utrecht/component-library-react';

import { ErrorPageData } from '../types';

interface ErrorPageProps extends ErrorPageData {}

export const ErrorPage = ({
  title = '404 – Niet gevonden',
  message = 'Het object dat je probeert te bekijken bestaat niet of is niet beschikbaar.',
}: ErrorPageProps) => {
  return (
    <main className="utrecht-page-content">
      <div className="utrecht-error-page">
        <Heading level={1}>{title}</Heading>
        <Paragraph>{message}</Paragraph>
        <ButtonGroup>
          <Button
            appearance="secondary-action-button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
          >
            Ga terug
          </Button>
        </ButtonGroup>
      </div>
    </main>
  );
};

export default ErrorPage;
