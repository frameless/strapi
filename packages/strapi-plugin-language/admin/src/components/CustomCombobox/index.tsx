import i18nLanguages from '@cospired/i18n-iso-languages';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Field, FieldError, FieldHint, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import { useIntl } from 'react-intl';
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'));
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/nl.json'));

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

  // TODO pull locale from strapi

  const locale = 'nl';

  const languages = [
    {
      name: i18nLanguages.getName('NL', locale),
      code: 'nl',
    },
    {
      name: i18nLanguages.getName('EN', locale),
      code: 'en',
    },
    {
      name: i18nLanguages.getName('AR', locale),
      code: 'ar',
    },
    {
      name: i18nLanguages.getName('UK', locale),
      code: 'uk',
    },
    {
      name: i18nLanguages.getName('TR', locale),
      code: 'tr',
    },
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
          onChange={(code: string) => onChange({ target: { name, value: code, type: attribute.type } })}
        >
          {languages.map(({ code, name }) => (
            <ComboboxOption value={code} key={code}>
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
