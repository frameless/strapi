import { TextInput } from '@strapi/design-system/TextInput';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface RichtextPreviewInputProps {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (param: { target: { name: string; value: string; type: string } }) => void;
  attribute: any;
  value: string;
  intlLabel: any;
  description: any;
  placeholder: any;
  error: string;
}
const RichtextPreviewInput = ({
  name,
  onChange,
  attribute,
  value,
  intlLabel,
  description,
  placeholder,
  error,
}: RichtextPreviewInputProps) => {
  const { formatMessage } = useIntl();
  const updateLabel = useCallback(
    (event: CustomEvent) => {
      if (!event.detail) return;
      const eventNameParts = event.detail.name?.split('.') || [];
      const nameParts = name?.split('.') || [];

      if (eventNameParts.length > 1 && nameParts.length > 1 && eventNameParts[1] === nameParts[1]) {
        onChange({ target: { name, value: event.detail.label, type: attribute.type } });
      }
    },
    [name, onChange, attribute.type],
  );

  useEffect(() => {
    window.addEventListener('labelUpdated', updateLabel as EventListener);

    return () => {
      window.removeEventListener('labelUpdated', updateLabel as EventListener);
    };
  }, [updateLabel]);

  return (
    <TextInput
      disabled
      name={name}
      value={value}
      error={error}
      placeholder={placeholder && formatMessage(placeholder)}
      label={intlLabel && formatMessage(intlLabel)}
      hint={description && formatMessage(description)}
    />
  );
};

export default RichtextPreviewInput;
