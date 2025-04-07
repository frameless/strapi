import { Combobox, ComboboxOption, TextInput } from '@strapi/design-system';
import { Stack } from '@strapi/design-system/Stack';
import React from 'react';
import { useIntl } from 'react-intl';
import usePluginConfig from '../../hooks/use-plugin-config';
import getTrad from '../../utils/getTrad';

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
type FloLegalData = {
  identifier: string;
  name?: string;
};
type FloLegalDataParams = FloLegalData;
const generateFloLegalData = (params: FloLegalDataParams) => new URLSearchParams({ ...params }).toString();

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
}: CustomComboboxProps) => {
  const { formatMessage } = useIntl();
  const { config: data, isLoading } = usePluginConfig();

  if (!data?.config?.api_url || !data?.config?.token) {
    return (
      <TextInput
        id={name}
        error={error}
        placeholder={formatMessage({
          id: getTrad('flo-legal-embed.disabled.placeholder'),
          defaultMessage: 'This field is disabled until necessary settings are configured.',
        })}
        label={formatMessage(intlLabel)}
        name={name}
        hint={formatMessage({
          id: getTrad('flo-legal-embed.disabled.hint'),
          defaultMessage:
            'Please ensure the required settings (FLO_LEGAL_API_URL and FLO_LEGAL_API_TOKEN) are properly configured to enable this field.',
        })}
        value=""
        disabled
      />
    );
  }

  return (
    <Stack spacing={1}>
      <Combobox
        action={labelAction}
        required={required}
        name={name}
        error={error}
        hint={description && formatMessage(description)}
        placeholder={placeholder && formatMessage(placeholder)}
        label={formatMessage(intlLabel)}
        aria-disabled={disabled}
        disabled={disabled}
        value={value}
        onChange={(url: string) => onChange({ target: { name, value: url, type: attribute.type } })}
        loading={isLoading}
      >
        {data?.checks?.length > 0 &&
          data?.checks?.map(({ identifier, name }: FloLegalData) => (
            <ComboboxOption value={generateFloLegalData({ identifier })} key={identifier}>
              <strong>{name}</strong>
            </ComboboxOption>
          ))}
      </Combobox>
    </Stack>
  );
};

export default CustomCombobox;
