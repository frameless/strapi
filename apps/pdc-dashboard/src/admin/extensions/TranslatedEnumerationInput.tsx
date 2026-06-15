/**
 * Workaround for Strapi v5 removing enum label translation support.
 * Background, upgrade checklist, and manual UI test: ./TranslatedEnumerationInput.md
 * After every Strapi upgrade run: node scripts/check-strapi-enum-workaround.mjs
 */

import { forwardRef, memo } from 'react';
import type { ReactNode } from 'react';
import { Field, SingleSelect, SingleSelectOption, useComposedRefs } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useField, useFocusInputField } from '@strapi/admin/strapi-admin';

interface EnumAttribute {
  type: 'enumeration';
  enum: string[];
  required?: boolean;
  default?: string;
}

interface TranslatedEnumerationInputProps {
  name: string;
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  labelAction?: ReactNode;
  attribute: EnumAttribute;
  disabled?: boolean;
  placeholder?: string;
}

const TranslatedEnumerationInput = forwardRef<HTMLDivElement, TranslatedEnumerationInputProps>(
  ({ name, required, label, hint, labelAction, attribute, disabled, placeholder }, ref) => {
    const { formatMessage } = useIntl();
    const field = useField(name);
    const fieldRef = useFocusInputField<HTMLDivElement>(name);
    const composedRefs = useComposedRefs(ref, fieldRef);

    const options = (attribute?.enum ?? []).map((value) => ({
      value,
      label: formatMessage({ id: value, defaultMessage: value }),
    }));

    return (
      <Field.Root error={field.error} name={name} hint={hint} required={required}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        <SingleSelect
          ref={composedRefs}
          onChange={(value) => {
            field.onChange(name, value === '' ? null : value);
          }}
          value={field.value}
          disabled={disabled}
          placeholder={placeholder}
        >
          <SingleSelectOption value="" disabled={required} hidden={required}>
            {formatMessage({
              id: 'components.InputSelect.option.placeholder',
              defaultMessage: 'Choose here',
            })}
          </SingleSelectOption>
          {options.map(({ value, label: optionLabel }) => (
            <SingleSelectOption key={value} value={value}>
              {optionLabel}
            </SingleSelectOption>
          ))}
        </SingleSelect>
        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  },
);

TranslatedEnumerationInput.displayName = 'TranslatedEnumerationInput';

export default memo(TranslatedEnumerationInput);
