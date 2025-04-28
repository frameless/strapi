import { Box, Button, Dialog, DialogBody, DialogFooter, Flex, Stack } from '@strapi/design-system';
import { Field, FieldLabel } from '@strapi/design-system/Field';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import { Option, Select } from '@strapi/design-system/Select';
import { TextInput } from '@strapi/design-system/TextInput';
import { Textarea } from '@strapi/design-system/Textarea';
import { auth } from '@strapi/helper-plugin';
import Bold from '@strapi/icons/Bold';
import BulletList from '@strapi/icons/BulletList';
import Code from '@strapi/icons/Code';
import Italic from '@strapi/icons/Italic';
import Landscape from '@strapi/icons/Landscape';
import LinkIcon from '@strapi/icons/Link';
import NumberList from '@strapi/icons/NumberList';
import Pencil from '@strapi/icons/Pencil';
import Strikethrough from '@strapi/icons/StrikeThrough';
import Underline from '@strapi/icons/Underline';
import { Level } from '@tiptap/extension-heading';
import type { Editor as EditorTypes } from '@tiptap/react';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useInView } from 'react-cool-inview';
import {
  AiFillYoutube,
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineLine,
  AiOutlineTable,
} from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';
import { GrBlockQuote } from 'react-icons/gr';
import { VscTable } from 'react-icons/vsc';
import { useIntl } from 'react-intl';
import { LanguagesList } from './LanguagesList';
import { PriceList } from './PriceList';
import { ToolbarItemHeadingWithID } from './ToolbarItems/HeadingWithID';
import defaultSettings from '../../../../utils/defaults';
import { useLink } from '../../hooks/useLink';
import { PriceListTypes } from '../../types';
import getTrad from '../../utils/getTrad';
import { localizeLanguagesNames } from '../../utils/localizeLanguagesNames';
import { LinkDialog } from '../LinkDialog';
import initialTableWithCaption from '../extensions/schema/initialTableWithCaptionData';

type SetYouTubeVideoOptions = { src: string; width?: number; height?: number; start?: number; 'data-title': string };
type HeadingEventsTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'leadParagraph';

interface ToolbarProps {
  editor: EditorTypes;
  settings: typeof defaultSettings;
  toggleMediaLib: () => void;
  productPrice?: PriceListTypes;
}

interface LinkToolbarProps {
  editor: EditorTypes;
  onClick: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
}

export const LinkToolbar = ({ editor, onClick, label }: LinkToolbarProps) => {
  return (
    <IconButton
      icon={<LinkIcon />}
      label={label}
      className={classnames('medium-icon', { 'is-active': editor.isActive('link') })}
      onClick={onClick}
    />
  );
};

const onHeadingChange = (editor: EditorTypes, type: HeadingEventsTypes) => {
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

export const Toolbar = ({ editor, toggleMediaLib, settings, productPrice }: ToolbarProps) => {
  const {
    isVisibleLinkDialog,
    onCloseLinkDialog,
    linkInput,
    onLinkUrlInputChange,
    openLinkDialog,
    onInsertLink,
    error,
  } = useLink(editor);
  // YouTube
  const [isVisibleYouTubeDialog, setIsVisibleYouTubeDialog] = useState(false);
  const user = auth.getUserInfo();
  const locale = user.preferedLanguage || 'nl';
  const [youTubeInput, setYouTubeInput] = useState('');
  const [youTubeHeightInput, setYouTubeHeightInput] = useState(settings.youtube.height);
  const [youTubeWidthInput, setYouTubeWidthInput] = useState(settings.youtube.width);
  const [youTubeTitleInput, setYouTubeTitleInput] = useState('');
  const { formatMessage } = useIntl();

  const onInsertYouTubeEmbed = () => {
    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: youTubeInput,
        width: youTubeWidthInput,
        height: youTubeHeightInput,
        'data-title': youTubeTitleInput,
      } as SetYouTubeVideoOptions)
      .run();
    setYouTubeInput('');
    setIsVisibleYouTubeDialog(false);
    setYouTubeTitleInput('');
  };
  // Base64 Image dialog
  const [base64MediaLibVisible, setBase64MediaLibVisible] = useState(false);
  const [base64Input, setBase64Input] = useState('');
  // const handleToggleBase54MediaLib = () => setBase64MediaLibVisible(prev => !prev);

  // const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  // const isValidBase64String = base64regex.test(base64Input);

  const openBase64Dialog = () => {
    if (editor.getAttributes('image').src && editor.getAttributes('image').src.includes(';base64'))
      setBase64Input(editor.getAttributes('image').src);
    setBase64MediaLibVisible(true);
  };

  const onInsertBase64Image = () => {
    editor.chain().focus().setImage({ src: base64Input }).run();
    setBase64Input('');
    setBase64MediaLibVisible(false);
  };

  if (!editor) {
    return null;
  }

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
    <div className={classnames('menu-bar')}>
      <Box className={classnames('button-group')}>
        <Select
          id="select1"
          required
          size="S"
          placeholder="Text style"
          onChange={(value: HeadingEventsTypes) => onHeadingChange(editor, value)}
          value={selectedTextStyle}
        >
          <Option value="paragraph">
            {formatMessage({
              id: getTrad('components.toolbar.text.paragraph'),
              defaultMessage: 'Paragraph',
            })}
          </Option>
          <Option value="leadParagraph">
            {formatMessage({
              id: getTrad('components.toolbar.text.leadParagraph'),
              defaultMessage: 'Lead Paragraph',
            })}
          </Option>
          {settings.headings.includes('h1') ? (
            <Option value="h1">
              {formatMessage({
                id: getTrad('components.toolbar.text.heading1'),
                defaultMessage: 'Heading 1',
              })}
            </Option>
          ) : null}
          {settings.headings.includes('h2') ? (
            <Option value="h2">
              {formatMessage({
                id: getTrad('components.toolbar.text.heading2'),
                defaultMessage: 'Heading 2',
              })}
            </Option>
          ) : null}
          {settings.headings.includes('h3') ? (
            <Option value="h3">
              {formatMessage({
                id: getTrad('components.toolbar.text.heading3'),
                defaultMessage: 'Heading 3',
              })}
            </Option>
          ) : null}
          {settings.headings.includes('h4') ? (
            <Option value="h4">
              {formatMessage({
                id: getTrad('components.toolbar.text.heading4'),
                defaultMessage: 'Heading 4',
              })}
            </Option>
          ) : null}
          {settings.headings.includes('h5') ? (
            <Option value="h5">
              {formatMessage({
                id: getTrad('components.toolbar.text.heading5'),
                defaultMessage: 'Heading 5',
              })}
            </Option>
          ) : null}
          {settings.headings.includes('h6') ? (
            <Option value="h6">
              {formatMessage({
                id: getTrad('components.toolbar.text.heading6'),
                defaultMessage: 'Heading 6',
              })}
            </Option>
          ) : null}
        </Select>
      </Box>
      {productPrice && productPrice?.price?.length > 0 && productPrice.title && (
        <Box className={classnames('button-group')}>
          <PriceList
            value={editor.isActive('priceWidget') ? editor.getAttributes('priceWidget')['data-strapi-idref'] : ''}
            onPriceChange={(price) => {
              if (price && editor) {
                editor.chain().focus().insertReactComponent(price).run();
              }
            }}
            productPrice={productPrice}
          />
        </Box>
      )}
      {settings.other.language.enabled && (
        <Box className={classnames('button-group')}>
          <LanguagesList
            editor={editor}
            languages={localizeLanguagesNames(settings.other.language.default, locale)}
            selectField={{
              placeholder: formatMessage({
                id: getTrad('components.languagesList.placeholder'),
                defaultMessage: 'Select a language',
              }),
              removeLanguageOption: formatMessage({ id: getTrad('components.languagesList.removeLanguage') }),
            }}
          />
        </Box>
      )}
      <IconButtonGroup className={classnames('button-group')}>
        {settings.bold ? (
          <IconButton
            icon={<Bold />}
            label={formatMessage({
              id: getTrad('components.toolbar.bold'),
              defaultMessage: 'Bold',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('bold') })}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
        ) : null}
        {settings.italic ? (
          <IconButton
            icon={<Italic />}
            label={formatMessage({
              id: getTrad('components.toolbar.italic'),
              defaultMessage: 'Italic',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('italic') })}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
        ) : null}
        {settings.strikethrough ? (
          <IconButton
            icon={<Strikethrough />}
            label={formatMessage({
              id: getTrad('components.toolbar.strikethrough'),
              defaultMessage: 'Strikethrough',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('strike') })}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />
        ) : null}
        {settings.underline ? (
          <IconButton
            icon={<Underline />}
            label={formatMessage({
              id: getTrad('components.toolbar.underline'),
              defaultMessage: 'Underline',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('underline') })}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
        ) : null}
        {settings.highlight ? (
          <IconButton
            icon={<Pencil />}
            label={formatMessage({
              id: getTrad('components.toolbar.highlight'),
              defaultMessage: 'Highlight',
            })}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={classnames('large-icon', { 'is-active': editor.isActive('highlight') })}
          />
        ) : null}
      </IconButtonGroup>

      <IconButtonGroup className={classnames('button-group')}>
        {settings.align.includes('left') ? (
          <IconButton
            icon={<AiOutlineAlignLeft />}
            label={formatMessage({
              id: getTrad('components.toolbar.alignLeft'),
              defaultMessage: 'Align left',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive({ textAlign: 'left' }) })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          />
        ) : null}
        {settings.align.includes('center') ? (
          <IconButton
            icon={<AiOutlineAlignCenter />}
            label={formatMessage({
              id: getTrad('components.toolbar.alignCenter'),
              defaultMessage: 'Align center',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive({ textAlign: 'center' }) })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          />
        ) : null}
        {settings.align.includes('right') ? (
          <IconButton
            icon={<AiOutlineAlignRight />}
            label={formatMessage({
              id: getTrad('components.toolbar.alignRight'),
              defaultMessage: 'Align right',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive({ textAlign: 'right' }) })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          />
        ) : null}
      </IconButtonGroup>

      <IconButtonGroup className={classnames('button-group')}>
        {settings.lists.includes('ul') ? (
          <IconButton
            icon={<BulletList />}
            label={formatMessage({
              id: getTrad('components.toolbar.bulletList'),
              defaultMessage: 'Bullet List',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('bulletList') })}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
        ) : null}
        {settings.lists.includes('ol') ? (
          <IconButton
            icon={<NumberList />}
            label={formatMessage({
              id: getTrad('components.toolbar.orderedList'),
              defaultMessage: 'Ordered List',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('orderedList') })}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
        ) : null}
      </IconButtonGroup>
      <IconButtonGroup className={classnames('button-group')}>
        {settings.code ? (
          <IconButton
            icon={<Code />}
            label={formatMessage({
              id: getTrad('components.toolbar.code'),
              defaultMessage: 'Code',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('codeBlock') })}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
        ) : null}
        {settings.blockquote ? (
          <IconButton
            icon={<GrBlockQuote />}
            label={formatMessage({
              id: getTrad('components.toolbar.blockquote'),
              defaultMessage: 'Block Quote',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('blockquote') })}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
        ) : null}
        <LinkDialog
          onDialogClose={onCloseLinkDialog}
          isDialogOpen={isVisibleLinkDialog}
          dialogTitle={formatMessage({
            id: getTrad('components.toolbar.linkDialog.title'),
            defaultMessage: 'Insert a URL link',
          })}
          textInputProps={{
            label: formatMessage({
              id: getTrad('components.toolbar.linkDialog.textInput.label'),
              defaultMessage: 'Insert a URL link',
            }),
            placeholder: formatMessage({
              id: getTrad('components.toolbar.linkDialog.textInput.placeholder'),
              defaultMessage: 'Write or paste the URL here',
            }),
            name: 'url',
            onChange: (e) => onLinkUrlInputChange(e.target.value),
            value: linkInput,
            ariaLabel: 'URL',
            hint: formatMessage({
              id: getTrad('components.toolbar.linkDialog.textInput.hint'),
              defaultMessage:
                "URLs should start with 'https://' or 'http://', for example: https://www.example.com or https://example.com",
            }),
            error: error
              ? formatMessage({
                  id: getTrad('components.toolbar.linkDialog.textInput.error'),
                  defaultMessage:
                    "Invalid URL. Ensure it starts with 'https://' or 'http://', for example: https://www.example.com or https://example.com",
                })
              : undefined,
          }}
          startActionButtonProps={{
            onClick: onCloseLinkDialog,
            text: formatMessage({
              id: getTrad('components.toolbar.linkDialog.startActionButtonText'),
              defaultMessage: 'Cancel',
            }),
          }}
          endActionButtonProps={{
            onClick: onInsertLink,
            text: formatMessage({
              id: getTrad('components.toolbar.linkDialog.endActionButtonText'),
              defaultMessage: 'Insert URL',
            }),
            disabled: Boolean(error),
          }}
        />

        {settings.links.enabled ? (
          <LinkToolbar
            onClick={openLinkDialog}
            editor={editor}
            label={formatMessage({
              id: getTrad('components.toolbar.link'),
              defaultMessage: 'Link',
            })}
          />
        ) : null}

        {settings.image.enabled ? (
          <IconButton
            icon={<Landscape />}
            label={
              editor.isActive('image')
                ? formatMessage({
                    id: getTrad('components.toolbar.image.change'),
                    defaultMessage: 'Change image',
                  })
                : formatMessage({
                    id: getTrad('components.toolbar.image.insert'),
                    defaultMessage: 'Insert image',
                  })
            }
            className={classnames('large-icon', {
              'is-active': editor.isActive('image') && !editor.getAttributes('image').src.includes(';base64'),
            })}
            onClick={toggleMediaLib}
          />
        ) : null}

        <Dialog
          onClose={() => setBase64MediaLibVisible(false)}
          title={formatMessage({
            id: getTrad('components.toolbar.base64Dialog.title'),
            defaultMessage: 'Insert base64 image',
          })}
          isOpen={base64MediaLibVisible}
        >
          <DialogBody>
            <Stack spacing={2}>
              <Textarea
                label={formatMessage({
                  id: getTrad('components.toolbar.base64Dialog.textarea.label'),
                  defaultMessage: 'Base64 image',
                })}
                placeholder={formatMessage({
                  id: getTrad('components.toolbar.base64Dialog.textarea.placeholder'),
                  defaultMessage: 'Enter Base64 content',
                })}
                name="url"
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setBase64Input(event.target.value)}
                value={base64Input}
                style={{ maxHeight: '200px' }}
                aria-label={formatMessage({
                  id: getTrad('components.toolbar.base64Dialog.textarea.AriaLabel'),
                  defaultMessage: 'Base64 image',
                })}
              />

              <Field name="preview">
                <Stack spacing={1}>
                  <FieldLabel>
                    {formatMessage({ id: getTrad('common.action.preview'), defaultMessage: 'Preview' })}
                  </FieldLabel>
                  {base64Input.length ? <img style={{ maxWidth: '100%' }} src={base64Input} alt="" /> : null}
                </Stack>
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter
            startAction={
              <Button
                onClick={() => {
                  setBase64Input('');
                  setBase64MediaLibVisible(false);
                }}
                variant="tertiary"
              >
                {formatMessage({
                  id: getTrad('common.action.cancel'),
                  defaultMessage: 'Cancel',
                })}
              </Button>
            }
            endAction={
              <Button disabled={base64Input.length === 0} onClick={() => onInsertBase64Image()} variant="success-light">
                {formatMessage({
                  id: getTrad('common.action.insert'),
                  defaultMessage: 'Insert',
                })}
              </Button>
            }
          />
        </Dialog>

        {settings.image.allowBase64 ? (
          <IconButton
            icon={<FaImage />}
            label={
              editor.isActive('image')
                ? formatMessage({
                    id: getTrad('components.toolbar.base64Content.change'),
                    defaultMessage: 'Change base64 content',
                  })
                : formatMessage({
                    id: getTrad('components.toolbar.base64Content.insert'),
                    defaultMessage: 'Insert base64 content',
                  })
            }
            className={classnames('large-icon', {
              'is-active': editor.isActive('image') && editor.getAttributes('image').src.includes(';base64'),
            })}
            onClick={openBase64Dialog}
          />
        ) : null}
        <IconButton
          icon={<VscTable />}
          label={formatMessage({
            id: getTrad('components.toolbar.tableWithCaption'),
            defaultMessage: 'Insert Table with Caption',
          })}
          className={classnames('large-icon', { 'is-active': editor.isActive('capturedTable') })}
          onClick={() => {
            editor.chain().focus().insertContent(initialTableWithCaption).run();
          }}
        />
        {settings.table ? (
          <IconButton
            icon={<AiOutlineTable />}
            label={formatMessage({
              id: getTrad('components.toolbar.table'),
              defaultMessage: 'Insert Table',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('table') })}
            onClick={() => editor.chain().focus().insertTable({ cols: 3, rows: 3, withHeaderRow: true }).run()}
          />
        ) : null}
        {settings.youtube.enabled ? (
          <IconButton
            icon={<AiFillYoutube />}
            label={formatMessage({
              id: getTrad('components.toolbar.youtube'),
              defaultMessage: 'Insert YouTube video',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('youtube') })}
            onClick={() => {
              if (editor.getAttributes('youtube').src) {
                setYouTubeInput(editor.getAttributes('youtube').src);
              }
              if (editor.getAttributes('youtube')['aria-label']) {
                setYouTubeTitleInput(editor.getAttributes('youtube')['aria-label']);
              }
              setIsVisibleYouTubeDialog(true);
            }}
          />
        ) : null}
        {settings.horizontal ? (
          <IconButton
            icon={<AiOutlineLine />}
            label={formatMessage({
              id: getTrad('components.toolbar.horizontalRule'),
              defaultMessage: 'Insert Horizontal Rule',
            })}
            className={classnames('large-icon', { 'is-active': editor.isActive('horizontalRule') })}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
        ) : null}
        <Dialog
          onClose={() => setIsVisibleYouTubeDialog(false)}
          title={formatMessage({
            id: getTrad('components.toolbar.youtubeDialog.label'),
            defaultMessage: 'Insert YouTube Video',
          })}
          isOpen={isVisibleYouTubeDialog}
        >
          <DialogBody>
            <Stack spacing={2}>
              <TextInput
                label={formatMessage({
                  id: getTrad('components.toolbar.youtubeDialog.urlInput.label'),
                  defaultMessage: 'Insert YouTube Video',
                })}
                placeholder={formatMessage({
                  id: getTrad('components.toolbar.youtubeDialog.urlInput.placeholder'),
                  defaultMessage: 'Enter YouTube URL',
                })}
                name="url"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setYouTubeInput(event.target.value)}
                value={youTubeInput}
                aria-label={formatMessage({
                  id: getTrad('components.toolbar.youtubeDialog.urlInput.AriaLabel'),
                  defaultMessage: 'YouTube URL',
                })}
              />
              <TextInput
                label={formatMessage({
                  id: getTrad('components.toolbar.youtubeDialog.titleInput.label'),
                  defaultMessage: 'YouTube video Title',
                })}
                placeholder={
                  formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.titleInput.placeholder'),
                    defaultMessage: 'Enter YouTube video Title',
                  }) as string
                }
                name="title"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setYouTubeTitleInput(event.target.value);
                }}
                value={youTubeTitleInput}
                aria-label={
                  formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.titleInput.AriaLabel'),
                    defaultMessage: 'YouTube video Title',
                  }) as string
                }
              />
              <Stack horizontal spacing={2}>
                <TextInput
                  label={formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.widthInput.label'),
                    defaultMessage: 'YouTube video width',
                  })}
                  type="number"
                  placeholder={formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.widthInput.placeholder'),
                    defaultMessage: 'width of the embed',
                  })}
                  name="url"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setYouTubeWidthInput(Number(event.target.value))
                  }
                  value={youTubeWidthInput}
                  aria-label={formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.widthInput.AriaLabel'),
                    defaultMessage: 'YouTube video width',
                  })}
                />

                <TextInput
                  label={formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.heightInput.label'),
                    defaultMessage: 'YouTube video height',
                  })}
                  type="number"
                  placeholder={formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.heightInput.placeholder'),
                    defaultMessage: 'height of the embed',
                  })}
                  name="url"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setYouTubeHeightInput(Number(event.target.value))
                  }
                  value={youTubeHeightInput}
                  aria-label={formatMessage({
                    id: getTrad('components.toolbar.youtubeDialog.heightInput.AriaLabel'),
                    defaultMessage: 'YouTube video height',
                  })}
                />
              </Stack>
            </Stack>
          </DialogBody>
          <DialogFooter
            startAction={
              <Button
                onClick={() => {
                  setYouTubeInput('');
                  setIsVisibleYouTubeDialog(false);
                }}
                variant="tertiary"
              >
                {formatMessage({
                  id: getTrad('common.action.cancel'),
                  defaultMessage: 'Cancel',
                })}
              </Button>
            }
            endAction={
              <Button
                disabled={youTubeInput.length === 0 || youTubeTitleInput.length === 0}
                onClick={() => onInsertYouTubeEmbed()}
                variant="success-light"
              >
                {formatMessage({
                  id: getTrad('common.action.insert'),
                  defaultMessage: 'Insert',
                })}
              </Button>
            }
          />
        </Dialog>
      </IconButtonGroup>
      <ToolbarItemHeadingWithID editor={editor} />
    </div>
  );
};
