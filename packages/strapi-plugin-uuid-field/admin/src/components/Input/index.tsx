import { TextInput } from '@strapi/design-system';
import React, { forwardRef, useEffect } from 'react';
import type { ForwardedRef, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import { v4 } from 'uuid';

type AttributesOptionTypes = {
  id?: string;
  defaultMessage?: string;
};

type Attributes = {
  type: string;
  customField: string;
  pluginOptions: {
    i18n: { localized: boolean };
  };
};

type Target = {
  name: string;
  value: string;
  type: string;
};

type OnChangeParamTypes = {
  target: Target;
};
interface UUIDInputProps {
  intlLabel: AttributesOptionTypes;
  // eslint-disable-next-line no-unused-vars
  onChange: (param: OnChangeParamTypes) => {};
  attribute: Attributes;
  name: string;
  description: AttributesOptionTypes;
  disabled: boolean;
  error: string;
  labelAction: string;
  required: boolean;
  value: string;
  placeholder: AttributesOptionTypes;
}

const UUIDInput = forwardRef(
  (
    {
      value: initialValue,
      onChange,
      name,
      intlLabel,
      required,
      attribute,
      description,
      placeholder,
      error,
    }: PropsWithChildren<UUIDInputProps>,
    ref: ForwardedRef<UUIDInputProps>,
  ) => {
    const { formatMessage } = useIntl();
    useEffect(() => {
      if (!initialValue) {
        onChange({ target: { name, value: v4(), type: attribute.type } });
      }
    }, [initialValue]);

    return (
      <TextInput
        ref={ref}
        placeholder={placeholder && formatMessage(placeholder)}
        label={intlLabel && formatMessage(intlLabel)}
        name={name}
        hint={description && formatMessage(description)}
        onChange={onChange}
        value={initialValue}
        required={required}
        disabled={true}
        error={error}
      />
    );
  },
);
UUIDInput.displayName = 'UUIDInput';
export default UUIDInput;
