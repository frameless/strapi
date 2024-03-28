import { Combobox, ComboboxOption, TextInput } from '@strapi/design-system';
import {} from '@strapi/design-system/Combobox';
import { Stack } from '@strapi/design-system/Stack';
import React, { useEffect, useState } from 'react';
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
  const [openForms, setOpenForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { config } = usePluginConfig();
  const apiUrl = config?.api_url?.endsWith('/') ? `${config?.api_url}forms` : `${config?.api_url}/forms`;
  const fetchAllOpenForms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${config.token}`,
        },
      });
      const data = await response.json();
      setOpenForms(data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (config?.api_url && config?.token && apiUrl) {
      fetchAllOpenForms();
    }
  }, [config]);

  const generateOpenFormsData = (params) => {
    return new URLSearchParams({ ...params }).toString();
  };
  if (!config?.api_url || !config?.token) {
    return (
      <TextInput
        id={name}
        error={error}
        placeholder={formatMessage({
          id: getTrad('open-forms-embed.disabled.placeholder'),
          defaultMessage: 'This field is disabled until necessary settings are configured.',
        })}
        label={formatMessage(intlLabel)}
        name={name}
        hint={formatMessage({
          id: getTrad('open-forms-embed.disabled.hint'),
          defaultMessage:
            'Please ensure the required settings (OPEN_FORMS_API_URL and OPEN_FORMS_API_TOKEN) are properly configured to enable this field.',
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
        {openForms?.length > 0 &&
          openForms?.map(({ uuid, name, slug }) => (
            <ComboboxOption
              value={generateOpenFormsData({
                uuid,
                slug,
                label: name,
              })}
              key={uuid}
            >
              {name}
            </ComboboxOption>
          ))}
      </Combobox>
    </Stack>
  );
}

export default CustomCombobox;
