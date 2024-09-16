import { Select, SelectOption } from '@utrecht/component-library-react';
import { useId } from 'react';
import type { ChangeEventHandler } from 'react';
import { Price } from '../../types';
// import { getPriceValue } from '../../utils';

interface PriceListProps {
  data: {
    title: string;
    price: Price[];
  };
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string;
}

export const PriceToolbarItem = ({ data, label, onChange, value }: PriceListProps) => {
  return (
    <>
      {label && (
        <p id={useId()} hidden>
          {label}
        </p>
      )}
      <Select aria-labelledby={useId()} value={value} onChange={onChange}>
        {label && <SelectOption value="">{label}</SelectOption>}
        {data.title && <SelectOption value="">{data.title}</SelectOption>}
        {Array.isArray(data.price) &&
          data.price.map(({ uuid, label, value, currency }) => (
            <SelectOption key={uuid} value={uuid}>
              {label} {value} {currency}
            </SelectOption>
          ))}
      </Select>
    </>
  );
};
