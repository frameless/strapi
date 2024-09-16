// import { Option, Select } from '@strapi/design-system';
import type { Level } from '@tiptap/extension-heading';
import type { Editor as EditorTypes } from '@tiptap/react';
import { Select, SelectOption } from '@utrecht/component-library-react';
import classnames from 'classnames';
import { useId } from 'react';
type HeadingEventsTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'leadParagraph';
type Options = {
  value: string;
  label: string;
  enabled: boolean | undefined;
};
const onTextStyleChange = (editor: EditorTypes, type: HeadingEventsTypes) => {
  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number((type as any).replace('h', '')) as Level })
        .run();
      break;
    case 'paragraph':
      editor.chain().focus().setParagraph().run();
      break;
    case 'leadParagraph':
      editor.chain().focus().setLeadParagraph().run();
      break;
    default:
  }
};

interface HeadingProps {
  editor: EditorTypes;
  options: Options[];
  label: string;
}

export const TextStyleToolbar = ({ editor, options, label }: HeadingProps) => {
  let selectedTextStyle = 'none';

  if (editor.isActive('heading', { level: 1 })) selectedTextStyle = 'h1';

  if (editor.isActive('heading', { level: 2 })) selectedTextStyle = 'h2';

  if (editor.isActive('heading', { level: 3 })) selectedTextStyle = 'h3';

  if (editor.isActive('heading', { level: 4 })) selectedTextStyle = 'h4';

  if (editor.isActive('heading', { level: 5 })) selectedTextStyle = 'h5';

  if (editor.isActive('heading', { level: 6 })) selectedTextStyle = 'h6';

  if (editor.isActive('paragraph')) selectedTextStyle = 'paragraph';

  if (editor.isActive('paragraph', { 'data-lead': true })) selectedTextStyle = 'leadParagraph';

  return (
    <div className={classnames('utrecht-tiptap-toolbar__button-group')}>
      <p id={useId()} hidden>
        {label}
      </p>
      <Select
        id="select1"
        required
        onChange={(event) => onTextStyleChange(editor, event.target?.value as HeadingEventsTypes)}
        value={selectedTextStyle}
        aria-labelledby={useId()}
      >
        <SelectOption value="none">{label}</SelectOption>
        {options
          .filter((option) => option.enabled)
          .map((option) => (
            <SelectOption key={option.value} value={option.value} disabled={!option.enabled}>
              {option.label}
            </SelectOption>
          ))}
      </Select>
    </div>
  );
};
