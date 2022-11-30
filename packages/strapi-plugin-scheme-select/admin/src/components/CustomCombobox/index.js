import React from 'react';
import PropTypes from 'prop-types';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Stack } from '@strapi/design-system/Stack';
import { Field, FieldLabel, FieldError, FieldHint } from '@strapi/design-system/Field';
import { useIntl } from 'react-intl';

const CustomCombobox = ({
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
}) => {
  const { formatMessage } = useIntl();

  const schemeData = [
    { resourceIdentifier: '{http://standaarden.overheid.nl/owms/terms/}Gemeente', prefLabel: 'Gemeente' },
  ];
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
          onChange={(resourceIdentifier) =>
            onChange({ target: { name, value: resourceIdentifier, type: attribute.type } })
          }
        >
          {schemeData.map(({ prefLabel, resourceIdentifier }) => (
            <ComboboxOption value={resourceIdentifier} key={resourceIdentifier}>
              {prefLabel}
            </ComboboxOption>
          ))}
        </Combobox>
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

CustomCombobox.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
};

CustomCombobox.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default CustomCombobox;
