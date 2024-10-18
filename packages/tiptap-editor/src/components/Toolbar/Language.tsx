import { Select, SelectOption } from '@utrecht/component-library-react';
import type { ChangeEventHandler } from 'react';
import { useId } from 'react';
interface LanguageToolbarProps {
  languages: { name?: string; code?: string }[];
  // eslint-disable-next-line no-unused-vars
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  select: {
    removeLanguageLabel?: string;
    label: string;
  };
}

export const LanguageToolbar = ({ languages, onChange, select, value }: LanguageToolbarProps) => (
  <>
    {select.label && (
      <p id={useId()} hidden>
        {select.label}
      </p>
    )}
    <Select aria-labelledby={useId()} value={value} onChange={onChange}>
      {select.label && <SelectOption value="">{select.label}</SelectOption>}
      {select.removeLanguageLabel && <SelectOption value="remove_language">{select.removeLanguageLabel}</SelectOption>}
      {languages &&
        languages.length > 0 &&
        languages.map(({ code, name }) => (
          <SelectOption key={code} value={code}>
            {name}
          </SelectOption>
        ))}
    </Select>
  </>
);
