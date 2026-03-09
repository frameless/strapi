import { Markdown } from '@frameless/ui';
import { Heading, RichText, Separator } from '@utrecht/component-library-react';

import { VACObject } from '../types';

interface VacPageProps {
  data: VACObject;
  status?: 'DRAFT' | 'PUBLISHED';
}

const VacPage = ({ data }: VacPageProps) => {
  const vacData = data.record.data;

  return (
    <RichText>
      {vacData.vraag && <Heading level={1}>{vacData.vraag}</Heading>}
      {vacData.antwoord && <Markdown>{vacData.antwoord}</Markdown>}
      <Separator />
      {vacData.toelichting && <Markdown>{vacData.toelichting}</Markdown>}
    </RichText>
  );
};
export default VacPage;
