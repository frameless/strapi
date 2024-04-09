import i18nLanguages from '@cospired/i18n-iso-languages';
import {
  Box,
  Button,
  Combobox,
  ComboboxOption,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  IconButton,
} from '@strapi/design-system';
import { GridLayout } from '@strapi/design-system/Layout';
import { ToggleInput } from '@strapi/design-system/ToggleInput';
import { Typography } from '@strapi/design-system/Typography';
import { auth } from '@strapi/helper-plugin';
import { Trash } from '@strapi/icons';
import React, { useState } from 'react';
import { EditorOptions, HandleChangeEventType } from './Embeds';
import { LanguagesType } from '../../../types';
import { localizeLanguagesNames } from '../../../utils/localizeLanguagesNames';
import { sortLanguagesAlphabetically } from '../../../utils/sortLanguagesAlphabetically';
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'));
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/nl.json'));

interface OtherProps {
  values: EditorOptions;
  // eslint-disable-next-line no-unused-vars
  handleChange: (param: HandleChangeEventType) => void;
}

const Other: React.FC<OtherProps> = ({ values, handleChange }) => {
  const user = auth.getUserInfo();
  const locale = user.preferedLanguage || 'nl';
  const wordcount = values.other && values.other.wordcount;
  const [isVisible, setIsVisible] = useState(false);
  const [languages, setLanguages] = useState<LanguagesType[]>(values.other.language.default);
  const languagesArray = Object.keys(i18nLanguages.getNames(locale)).map((code) => ({
    code: code.toLocaleLowerCase(),
    name: i18nLanguages.getName(code, locale),
  }));
  const onLanguageChangeHandler = (value: string) => {
    if (!i18nLanguages.isValid(value) || languages.find(({ code }) => code === value)?.code) return;
    setLanguages(
      sortLanguagesAlphabetically([...languages, { name: i18nLanguages.getName(value, locale), code: value }]),
    );
  };

  return (
    <>
      <Box marginBottom="1rem">
        <Typography variant="beta">Other</Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label="Word count"
            hint="Show a word counter under the editor"
            size="S"
            name="other.wordcount"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={wordcount}
            onChange={() =>
              handleChange({
                target: {
                  name: 'other.wordcount',
                  value: !wordcount,
                },
              })
            }
          />
        </Box>
      </GridLayout>
      <GridLayout>
        <Flex marginTop={5} gap={3}>
          <ToggleInput
            label="Language"
            hint="Apply language attributes to text"
            size="S"
            name="other.language.enabled"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.other.language.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: 'other.language.enabled',
                  value: !values.other.language.enabled,
                },
              })
            }
          />
          <Button onClick={() => setIsVisible(true)} variant="tertiary">
            Settings
          </Button>
          <Dialog onClose={() => setIsVisible(false)} title="Language Settings" isOpen={isVisible}>
            <DialogBody>
              <Combobox placeholder="Search a language" label="Select a language" onChange={onLanguageChangeHandler}>
                {localizeLanguagesNames(languagesArray).map(({ code, name }) => (
                  <ComboboxOption value={code}>{name}</ComboboxOption>
                ))}
              </Combobox>

              {languages &&
                languages.length > 0 &&
                localizeLanguagesNames(languages).map(({ code, name }) => (
                  <Flex
                    justifyContent="space-between"
                    marginBottom={5}
                    marginTop={5}
                    marginRight={5}
                    marginLeft={5}
                    key={code}
                  >
                    {code && <Typography variant="delta">{i18nLanguages.getName(code, locale)}</Typography>}
                    <IconButton
                      variant="secondary"
                      aria-label={`Delete the ${name} language`}
                      icon={<Trash />}
                      onClick={() => setLanguages(languages.filter((c) => c.code !== code))}
                    />
                  </Flex>
                ))}
            </DialogBody>
            <DialogFooter
              startAction={
                <Button onClick={() => setIsVisible(false)} variant="tertiary">
                  Cancel
                </Button>
              }
              endAction={
                <Button
                  onClick={() => {
                    handleChange({
                      target: {
                        name: 'other.language.default',
                        value: languages,
                      },
                    });
                    setIsVisible(false);
                  }}
                  variant="secondary"
                >
                  Save Language
                </Button>
              }
            />
          </Dialog>
        </Flex>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem" />

      <GridLayout>
        <Box>
          <ToggleInput
            label="Save content as JSON"
            hint="Save editor content as JSON instead of raw HTML. NOTE: You will have to save pages again, as changing this setting will NOT auto update you currently saved content"
            size="S"
            name="other.saveJson"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.other.saveJson}
            onChange={() =>
              handleChange({
                target: {
                  name: 'other.saveJson',
                  value: !values.other.saveJson,
                },
              })
            }
          />
        </Box>
      </GridLayout>
    </>
  );
};

export default Other;
