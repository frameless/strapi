import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Field, FieldError, FieldHint, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import usePluginConfig from '../../hooks/use-plugin-config';

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
    return null;
  }
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
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
}

export default CustomCombobox;
