import { ColorSample } from '@utrecht/component-library-react';

export interface DigiToegankelijkColorSampleProps {
  status: string | 'A' | 'B' | 'C' | 'D' | 'E';
}

export const DigiToegankelijkColorSample = ({ status }: DigiToegankelijkColorSampleProps) => {
  const color: { [index: string]: string } = {
    A: 'rgb(34, 96, 34)',
    B: 'rgb(57, 148, 57)',
    C: 'rgb(254, 189, 87)',
    D: 'rgb(253, 107, 57)',
    E: 'rgb(252, 20, 46)',
  };

  return <ColorSample color={color[status] || color['E']} />;
};

export interface DigiToegankelijkStatusProps {
  criteriaTested: number;
  criteriaFailed: number;
  /** ISO8061 date */
  evaluationDate: string;

  /** ISO8061 date */
  renderDate: string;
}

export const DigiToegankelijkStatus = ({
  criteriaTested,
  criteriaFailed,
  evaluationDate,
  renderDate,
}: DigiToegankelijkStatusProps) => {
  let status = 'E';
  if (criteriaTested >= 50) {
    status = 'C';
    if (criteriaFailed < 50) {
      status = 'B';
    }
  }

  const SECONDS_IN_YEAR = 60 * 60 * 24 * 365;

  if (new Date(evaluationDate).getTime() - new Date(renderDate).getTime() > SECONDS_IN_YEAR * 3) {
    status = 'C';
  }
  const labels: { [index: string]: string } = {
    A: 'Voldoet volledig',
    B: 'Voldoet gedeeltelijk',
    C: 'Eerste maatregelen genomen',
    D: 'Voldoet niet',
    E: 'Geen verklaring',
  };
  const statusLabel = labels[status];

  return (
    <>
      {/* <DigiToegankelijkColorSample status={status} /> */}
      De status van deze website is: {status} - {statusLabel}
    </>
  );
};
