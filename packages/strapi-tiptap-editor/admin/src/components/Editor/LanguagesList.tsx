import { Option, Select } from '@strapi/design-system/Select';
import type { Editor as EditorTypes } from '@tiptap/react';
import React from 'react';

interface LanguagesListProps {
  editor: EditorTypes;
  languages: { name?: string; code?: string }[];
  selectField: {
    placeholder?: string;
    removeLanguageOption: string;
  };
}

export const LanguagesList = ({ editor, languages, selectField }: LanguagesListProps) => (
  <Select
    size="S"
    placeholder={selectField?.placeholder}
    value={editor.isActive('language') ? editor.getAttributes('language').lang : ''}
    onChange={(event: string | number) => {
      if (editor) {
        if (event === 'remove_language') {
          editor.chain().focus().unsetLanguage().run();
          return;
        }
        editor
          .chain()
          .focus()
          .toggleLanguage({ lang: event as string })
          .run();
      }
    }}
  >
    <Option value="remove_language">{selectField.removeLanguageOption}</Option>
    {languages &&
      languages.length > 0 &&
      languages.map(({ code, name }) => (
        <Option key={code} className="icon" value={code}>
          {name}
        </Option>
      ))}
  </Select>
);
