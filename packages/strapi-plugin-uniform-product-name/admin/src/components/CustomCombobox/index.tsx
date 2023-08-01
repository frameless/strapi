import { uplKeyValues } from '@frameless/upl';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Field, FieldError, FieldHint, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import React from 'react';
import { useIntl } from 'react-intl';

interface CustomComboboxProps {
  intlLabel: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (param: any) => {};
  attribute: any;
  name: string;
  description: any;
  disabled: boolean;
  error: string;
  labelAction: any;
  required: boolean;
  value: string;
  placeholder: any;
}

function CustomCombobox({
  value,
  onChange,
  name,
  intlLabel,
  labelAction,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}: CustomComboboxProps) {
  const { formatMessage } = useIntl();

  return (
    <Field name={name} id={name} error={error} hint={description && formatMessage(description)}>
      <Stack spacing={1}>
        <FieldLabel action={labelAction} required={required}>
          {formatMessage(intlLabel)}
        </FieldLabel>
        <Combobox
          placeholder={placeholder && formatMessage(placeholder)}
          aria-label={formatMessage(intlLabel)}
          aria-disabled={disabled}
          disabled={disabled}
          value={value}
          onChange={(url: string) => onChange({ target: { name, value: url, type: attribute.type } })}
        >
          {uplKeyValues.map(({ uri, uuid, value }) => (
            <ComboboxOption value={uri} key={uuid}>
              {value}
            </ComboboxOption>
          ))}
        </Combobox>
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
}

export default CustomCombobox;
