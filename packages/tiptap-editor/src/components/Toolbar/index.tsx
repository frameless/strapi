// import { auth } from '@strapi/helper-plugin';
import { useDialog } from '@frameless/ui';
import type { Editor as EditorTypes } from '@tiptap/react';
import { ButtonGroup } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import type { ChangeEvent } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { useInView } from 'react-cool-inview';
import {
  TbAlignCenter,
  TbAlignLeft,
  TbAlignRight,
  TbBold,
  TbCode,
  TbItalic,
  TbList,
  TbListNumbers,
  TbMinus,
  TbPencil,
  TbPhotoPlus,
  TbQuote,
  TbStrikethrough,
  TbTable,
  TbTextCaption,
  TbUnderline,
} from 'react-icons/tb';
import { copyToClipboard, createAnchorLink, ToolbarItemHeadingWithID } from './HeadingWithID';
import { PriceToolbarItem } from './Price';
import { ToolbarItem } from './ToolbarItem';
import styles from './styles.module.scss';
import priceContext from '../../context/price/context';
import initialTableWithCaption from '../../extensions/schema/initialTableWithCaptionData';
import { useLink } from '../../hooks/useLink';
import { useTranslation } from '../../i18n/config';
import defaultSettings from '../../utils/defaults';
import { localizeLanguagesNames } from '../../utils/localizeLanguagesNames';
import { ImageBase64Toolbar } from '../Toolbar/ImageBase64';
import { LanguageToolbar } from '../Toolbar/Language';
import { LinkToolbar } from '../Toolbar/Link';
import { TextStyleToolbar } from '../Toolbar/TextStyleToolbar';
import { YoutubeToolbar } from '../Toolbar/Youtube';

const css = classnames.bind(styles);
interface ToolbarProps {
  editor: EditorTypes;
  settings: typeof defaultSettings;
  toggleMediaLib?: () => void;
  locale?: string;
}

export const Toolbar = ({ editor, toggleMediaLib, settings, locale = 'nl' }: ToolbarProps) => {
  const { onCloseLinkDialog, linkInput, onLinkUrlInputChange, openLinkDialog, onInsertLink, error, linkDialogRef } =
    useLink(editor);
  const { openDialog } = useDialog();
  const { t } = useTranslation(locale, ['components']);
  // YouTube
  const [isVisibleYouTubeDialog, setIsVisibleYouTubeDialog] = useState(false);
  const [youTubeInput, setYouTubeInput] = useState('');
  const [youTubeHeightInput, setYouTubeHeightInput] = useState(settings?.youtube.height);
  const [youTubeWidthInput, setYouTubeWidthInput] = useState(settings?.youtube.width);
  const onInsertYouTubeEmbed = () => {
    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: youTubeInput,
        width: youTubeWidthInput,
        height: youTubeHeightInput,
      })
      .run();
    setYouTubeInput('');
    setIsVisibleYouTubeDialog(false);
  };

  // heading with ID
  const [headingID, setHeadingID] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [updateHeadingID, setUpdateHeadingID] = useState(false);
  const headingLevel = editor.getAttributes('heading')?.level;
  const currentHeadingID = editor.getAttributes('heading')?.id;
  const isHeadingActive = editor.isActive('heading');
  const { selection } = editor.state;
  const { $from } = selection;
  const node = $from.node($from.depth);
  const generatedID = createAnchorLink(node.textContent);
  const addIdToSelectedHeading = async (id: string) => {
    if (node.type.name === 'heading') {
      if (node.attrs.id !== id) {
        const transaction = editor.state.tr.setNodeMarkup($from.before(), undefined, {
          ...node.attrs,
          id,
        });
        editor.view.dispatch(transaction);
      }
    }
  };
  const onHeadingClickHandler = ({ id, dialogVisibility }: { id: string; dialogVisibility: boolean }) => {
    addIdToSelectedHeading(id).then(() => {
      if (!id) return;
      setHeadingID(id);
      setIsVisible(dialogVisibility);
      copyToClipboard(`#${id}`);
    });
  };

  // Base64 Image dialog
  const [base64MediaLibVisible, setBase64MediaLibVisible] = useState(false);
  const [base64Input, setBase64Input] = useState('');

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

  const { getPrice } = useContext(priceContext);
  const [price, setPrice] = useState<string>();
  const { observe, inView } = useInView({
    rootMargin: '-1px 0px 0px 0px',
    threshold: [1],
  });

  if (!editor) {
    return null;
  }
  const headingOptions = [
    {
      value: 'paragraph',
      label: t('toolbar.textStyle.options.paragraph', {
        defaultValue: 'Paragraph',
      }),
      enabled: true,
    },
    {
      value: 'leadParagraph',
      label: t('toolbar.textStyle.options.leadParagraph', {
        defaultValue: 'Lead Paragraph',
      }),
      enabled: true,
    },
    {
      value: 'h1',
      label: t('toolbar.textStyle.options.heading1', {
        defaultValue: 'Heading 1',
      }),
      enabled: settings?.headings.includes('h1'),
    },
    {
      value: 'h2',
      label: t('toolbar.textStyle.options.heading2', {
        defaultValue: 'Heading 2',
      }),
      enabled: settings?.headings.includes('h2'),
    },
    {
      value: 'h3',
      label: t('toolbar.textStyle.options.heading3', {
        defaultValue: 'Heading 3',
      }),
      enabled: settings?.headings.includes('h3'),
    },
    {
      value: 'h4',
      label: t('toolbar.textStyle.options.heading4', {
        defaultValue: 'Heading 4',
      }),
      enabled: settings?.headings.includes('h4'),
    },
    {
      value: 'h5',
      label: t('toolbar.textStyle.options.heading5', {
        defaultValue: 'Heading 5',
      }),
      enabled: settings?.headings.includes('h5'),
    },
    {
      value: 'h6',
      label: t('toolbar.textStyle.options.heading6', {
        defaultValue: 'Heading 6',
      }),
      enabled: settings?.headings.includes('h6'),
    },
  ];

  useEffect(() => {
    if (settings.price) {
      getPrice(settings.price.data);
    }
  }, [settings.price.data]);

  const imageToolbarUpdateLabel = `${t('actions.update', {
    defaultValue: 'Update',
  })} ${t('image', {
    defaultValue: 'Image',
  })}`;
  const imageToolbarInsertLabel = `${t('actions.insert', {
    defaultValue: 'Insert',
  })} ${t('image', {
    defaultValue: 'Image',
  })}`;
  const imageBase64Update = `${t('actions.update', {
    defaultValue: 'Update',
  })} ${t('base64', {
    defaultValue: 'Base64 Content',
  })}`;
  const imageBase64Insert = `${t('actions.insert', {
    defaultValue: 'Insert',
  })} ${t('base64', {
    defaultValue: 'Base64 Content',
  })}`;

  const headingWithIDEditLabel = t('toolbar.headingWithID.editLabel', {
    defaultMessage: `Edit heading-${headingLevel} and copy`,
    headingLevel,
  });
  const headingWithIDGenerateLabel = t('toolbar.headingWithID.generateLabel', {
    defaultMessage: `Generate ID for heading-${headingLevel} and copy`,
    headingLevel,
  });
  const updateLabel = t('actions.update', {
    defaultValue: 'Update',
  });
  const insertLabel = t('actions.insert', {
    defaultValue: 'Insert',
  });
  const headingWithIDdialogTitle = t('toolbar.headingWithID.dialog.title', {
    defaultMessage: `${updateHeadingID ? updateLabel : insertLabel} Heading ID`,
    state: updateHeadingID ? updateLabel : insertLabel,
  });
  const headingWithIDalertUpdateTitle = t('toolbar.headingWithID.dialog.alert.updatedTitle', {
    defaultMessage: 'The Heading ID updated successfully!',
  });
  const headingWithIDalertGeneratedTitle = t('toolbar.headingWithID.dialog.alert.generatedTitle', {
    defaultMessage: 'The Heading ID generated successfully!',
  });

  const isHeadingID = headingID.trim().length === 0;
  return (
    <div ref={observe} className={css({ sticky: !inView })}>
      <div className={css('utrecht-tiptap-toolbar')}>
        <TextStyleToolbar
          label={t('toolbar.textStyle.label', {
            defaultValue: 'Text Style',
          })}
          editor={editor}
          options={headingOptions}
        />
        {settings?.other.language.enabled && (
          <ButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
            <LanguageToolbar
              value={editor.isActive('language') ? editor.getAttributes('language').lang : ''}
              onChange={(event) => {
                if (editor) {
                  if (event.target.value === 'remove_language') {
                    editor.chain().focus().unsetLanguage().run();
                    return;
                  }
                  editor
                    .chain()
                    .focus()
                    .toggleLanguage({ lang: event.target.value as string })
                    .run();
                }
              }}
              languages={localizeLanguagesNames(settings?.other.language.default, locale)}
              select={{
                label: t('toolbar.language.label', {
                  defaultValue: 'Select a language',
                }),
                removeLanguageLabel: t('toolbar.language.removeLanguage', {
                  defaultValue: 'Remove language',
                }) as string,
              }}
            />
          </ButtonGroup>
        )}
        {settings?.price.enabled && (
          <ButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
            <PriceToolbarItem
              data={settings?.price.data}
              label={t('toolbar.price.label', {
                defaultValue: 'Select Price',
              })}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                if (!event.target.value) return;
                setPrice(event.target.value);
                editor.chain().focus().setPrice(event.target.value).run();
              }}
              value={price}
            />
          </ButtonGroup>
        )}
        <ButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
          {settings?.bold ? (
            <ToolbarItem
              label={t('toolbar.bold', {
                defaultValue: 'Bold',
              })}
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              icon={<TbBold />}
            />
          ) : null}
          {settings?.italic ? (
            <ToolbarItem
              icon={<TbItalic />}
              label={t('toolbar.italic', {
                defaultValue: 'Italic',
              })}
              isActive={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
          ) : null}
          {settings?.strikethrough ? (
            <ToolbarItem
              icon={<TbStrikethrough />}
              label={t('toolbar.strikeThrough', {
                defaultValue: 'Strikethrough',
              })}
              isActive={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            />
          ) : null}
          {settings?.underline ? (
            <ToolbarItem
              icon={<TbUnderline />}
              label={t('toolbar.underline', {
                defaultValue: 'Underline',
              })}
              isActive={editor.isActive('underline')}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
          ) : null}
          {settings?.highlight ? (
            <ToolbarItem
              icon={<TbPencil />}
              label={t('toolbar.highlight', {
                defaultValue: 'Highlight',
              })}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive('highlight')}
            />
          ) : null}
        </ButtonGroup>

        <ButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
          {settings?.align.includes('left') ? (
            <ToolbarItem
              icon={<TbAlignLeft />}
              label={t('toolbar.alignLeft', {
                defaultValue: 'Align left',
              })}
              isActive={editor.isActive({ textAlign: 'left' })}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
            />
          ) : null}
          {settings?.align.includes('center') ? (
            <ToolbarItem
              icon={<TbAlignCenter />}
              label={t('toolbar.alignCenter', {
                defaultValue: 'Align center',
              })}
              isActive={editor.isActive({ textAlign: 'center' })}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
            />
          ) : null}
          {settings?.align.includes('right') ? (
            <ToolbarItem
              icon={<TbAlignRight />}
              label={t('toolbar.alignRight', {
                defaultValue: 'Align right',
              })}
              isActive={editor.isActive({ textAlign: 'right' })}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
            />
          ) : null}
        </ButtonGroup>

        <ButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
          {settings?.lists.includes('ul') ? (
            <ToolbarItem
              icon={<TbList />}
              label={t('toolbar.bulletList', {
                defaultValue: 'Bullet list',
              })}
              isActive={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
          ) : null}
          {settings?.lists.includes('ol') ? (
            <ToolbarItem
              icon={<TbListNumbers />}
              label={t('toolbar.orderedList', {
                defaultValue: 'Ordered list',
              })}
              isActive={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
          ) : null}
        </ButtonGroup>
        <ButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
          {settings?.code ? (
            <ToolbarItem
              icon={<TbCode />}
              label={t('toolbar.code', {
                defaultValue: 'Code',
              })}
              isActive={editor.isActive('codeBlock')}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            />
          ) : null}
          {settings?.blockquote ? (
            <ToolbarItem
              icon={<TbQuote />}
              label={t('toolbar.blockquote', {
                defaultValue: 'Blockquote',
              })}
              isActive={editor.isActive('blockquote')}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />
          ) : null}

          {settings?.links.enabled ? (
            <LinkToolbar
              onClick={() => {
                openLinkDialog();
                openDialog();
              }}
              label={t('toolbar.link.label', {
                defaultValue: 'Link',
              })}
              isActive={editor.isActive('link')}
              dialog={{
                linkDialogRef: linkDialogRef,
                onClose: onCloseLinkDialog,
                title: t('toolbar.link.dialog.title', {
                  defaultValue: 'Insert link',
                }),
                input: {
                  label: t('toolbar.link.dialog.input.label', {
                    defaultValue: 'Insert a URL link',
                  }) as string,
                  placeholder: t('toolbar.link.dialog.input.placeholder', {
                    defaultValue: 'Write or paste the URL here',
                  }) as string,
                  name: 'url',
                  onChange: (event) => onLinkUrlInputChange(event.target.value),
                  value: linkInput,
                  ariaLabel: t('toolbar.link.dialog.input.ariaLabel', {
                    defaultValue: 'URL link input',
                  }) as string,
                  hint: t('toolbar.link.dialog.input.hint', {
                    defaultValue:
                      "URLs should start with 'https://' or 'http://', for example: https://www.example.com or https://example.com",
                  }) as string,
                  error:
                    error.length > 0
                      ? (t('toolbar.link.dialog.input.error', {
                          defaultValue:
                            "Invalid URL. Ensure it starts with 'https://' or 'http://', for example: https://www.example.com or https://example.com",
                        }) as string)
                      : undefined,
                },
                cancelButton: {
                  label: t('actions.cancel', {
                    defaultValue: 'Cancel',
                  }),
                  onClick: onCloseLinkDialog,
                },
                insertButton: {
                  label: t('actions.insert', {
                    defaultValue: 'Insert',
                  }),
                  onClick: onInsertLink,
                  disabled: Boolean(error),
                },
              }}
            />
          ) : null}

          {settings?.image.enabled ? (
            <ToolbarItem
              icon={<TbPhotoPlus />}
              label={editor.isActive('image') ? imageToolbarUpdateLabel : imageToolbarInsertLabel}
              isActive={editor.isActive('image') && !editor.getAttributes('image').src.includes(';base64')}
              onClick={toggleMediaLib}
            />
          ) : null}
          {settings?.image.allowBase64 ? (
            <ImageBase64Toolbar
              label={editor.isActive('image') ? imageBase64Update : imageBase64Insert}
              isActive={editor.isActive('image') && editor.getAttributes('image').src.includes(';base64')}
              onClick={openBase64Dialog}
              dialog={{
                title: imageBase64Update,
                isOpen: base64MediaLibVisible,
                onClose: () => setBase64MediaLibVisible(false),
                textarea: {
                  label: t('base64', {
                    defaultValue: 'Base64 Content',
                  }),
                  placeholder: imageBase64Insert,
                  name: 'base64',
                  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => setBase64Input(event.target.value),
                  value: base64Input,
                  ariaLabel: t('base64', {
                    defaultValue: 'Base64 Content',
                  }),
                },
                cancelButton: {
                  onClick: () => {
                    setBase64Input('');
                    setBase64MediaLibVisible(false);
                  },
                  label: t('actions.cancel', {
                    defaultValue: 'Cancel',
                  }),
                },
                insertButton: {
                  onClick: onInsertBase64Image,
                  label: t('actions.insert', {
                    defaultValue: 'Insert',
                  }),
                  disabled: base64Input.length === 0,
                },
              }}
            />
          ) : null}
          {settings?.table && (
            <ToolbarItem
              icon={<TbTextCaption />}
              label={t('toolbar.tableWithCaption')}
              isActive={editor.isActive('capturedTable')}
              onClick={() => {
                editor.chain().focus().insertContent(initialTableWithCaption).run();
              }}
            />
          )}
          {settings?.table ? (
            <ToolbarItem
              icon={<TbTable />}
              label={t('toolbar.table', {
                defaultValue: 'Insert Table',
              })}
              isActive={editor.isActive('table')}
              onClick={() => editor.chain().focus().insertTable({ cols: 3, rows: 3, withHeaderRow: true }).run()}
            />
          ) : null}
          {settings?.youtube.enabled ? (
            <YoutubeToolbar
              label={t('toolbar.youtube.label', {
                defaultValue: 'Insert YouTube Video',
              })}
              isActive={editor.isActive('youtube')}
              onClick={() => setIsVisibleYouTubeDialog(true)}
              dialog={{
                title: t('toolbar.youtube.dialog.title', {
                  defaultValue: 'Insert YouTube Video',
                }),
                isOpen: isVisibleYouTubeDialog,
                onclose: () => setIsVisibleYouTubeDialog(false),
                youtubeURLInput: {
                  label: t('toolbar.youtube.dialog.URLinput.label', {
                    defaultValue: 'YouTube URL',
                  }) as string,
                  placeholder: t('toolbar.youtube.dialog.URLinput.placeholder', {
                    defaultValue: 'Insert YouTube URL',
                  }) as string,
                  name: 'url',
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => setYouTubeInput(event.target.value),
                  value: youTubeInput,
                  ariaLabel: t('toolbar.youtube.dialog.URLinput.ariaLabel', {
                    defaultValue: 'YouTube URL input',
                  }) as string,
                },
                youTubeWidthInput: {
                  label: t('toolbar.youtube.dialog.widthInput.label', {
                    defaultValue: 'YouTube video width',
                  }) as string,
                  placeholder: t('toolbar.youtube.dialog.widthInput.placeholder', {
                    defaultValue: 'Width of the embed',
                  }) as string,
                  name: 'width',
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                    setYouTubeWidthInput(Number(event.target.value)),
                  value: youTubeWidthInput,
                  ariaLabel: t('toolbar.youtube.dialog.widthInput.ariaLabel', {
                    defaultValue: 'YouTube video width',
                  }) as string,
                },
                youTubeHeightInput: {
                  label: t('toolbar.youtube.dialog.heightInput.label', {
                    defaultValue: 'YouTube video height',
                  }) as string,
                  placeholder: t('toolbar.youtube.dialog.heightInput.placeholder', {
                    defaultValue: 'Height of the embed',
                  }) as string,
                  name: 'height',
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                    setYouTubeHeightInput(Number(event.target.value)),
                  value: youTubeHeightInput,
                  ariaLabel: t('toolbar.youtube.dialog.heightInput.ariaLabel', {
                    defaultValue: 'YouTube video height',
                  }) as string,
                },
                cancelButton: {
                  onClick: () => {
                    setYouTubeInput('');
                    setIsVisibleYouTubeDialog(false);
                  },
                  label: t('actions.cancel', {
                    defaultValue: 'Cancel',
                  }),
                },
                insertButton: {
                  onClick: onInsertYouTubeEmbed,
                  label: t('actions.insert', {
                    defaultValue: 'Insert',
                  }),
                  disabled: youTubeInput.length === 0,
                },
              }}
            />
          ) : null}
          {settings?.horizontal ? (
            <ToolbarItem
              icon={<TbMinus />}
              label={t('toolbar.horizontalRule', {
                defaultValue: 'Horizontal Rule',
              })}
              isActive={editor.isActive('horizontalRule')}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            />
          ) : null}
        </ButtonGroup>
        <ButtonGroup>
          <ToolbarItemHeadingWithID
            onClick={() => {
              if (currentHeadingID) {
                onHeadingClickHandler({ id: currentHeadingID, dialogVisibility: true });
                setUpdateHeadingID(true);
              } else {
                onHeadingClickHandler({ id: generatedID, dialogVisibility: true });
                setIsAlertVisible(true);
              }
            }}
            label={currentHeadingID ? headingWithIDEditLabel : headingWithIDGenerateLabel}
            isActive={currentHeadingID}
            disabled={!isHeadingActive}
            dialog={{
              title: headingWithIDdialogTitle,
              isOpen: isVisible,
              onClose: () => setIsVisible(false),
              updateID: updateHeadingID,
              input: {
                label: t('toolbar.headingWithID.dialog.input.label', {
                  defaultMessage: 'Heading ID',
                }) as string,
                placeholder: t('toolbar.headingWithID.dialog.input.placeholder', {
                  defaultValue: 'Enter a unique ID',
                }) as string,
                hint: t('toolbar.headingWithID.dialog.input.hint', {
                  defaultValue: 'The ID will be used to create a link to this heading',
                }) as string,
                error: isHeadingID
                  ? (t('toolbar.headingWithID.dialog.input.error', {
                      defaultValue: 'This field is required',
                    }) as string)
                  : '',

                defaultValue: currentHeadingID,
                value: headingID,
                onChange: (event: ChangeEvent<HTMLInputElement>) => setHeadingID(event.target.value),
              },
              alert: {
                title: updateHeadingID ? headingWithIDalertUpdateTitle : headingWithIDalertGeneratedTitle,
                onClose: () => {
                  setIsVisible(false);
                  setUpdateHeadingID(false);
                  setIsAlertVisible(false);
                },
                description: t('toolbar.headingWithID.dialog.alert.description', {
                  defaultMessage: 'ID copied to clipboard:',
                }),
                currentID: currentHeadingID,
              },
              isAlertVisible: isAlertVisible,
              cancelButton: {
                onClick: () => {
                  setIsVisible(false);
                  setUpdateHeadingID(false);
                  setIsAlertVisible(false);
                },
                label: t('actions.cancel', {
                  defaultValue: 'Cancel',
                }),
              },
              insertButton: {
                onClick: () => {
                  setUpdateHeadingID(true);
                  setIsAlertVisible(false);
                  if (updateHeadingID) {
                    onHeadingClickHandler({ id: headingID, dialogVisibility: true });
                    setIsAlertVisible(true);
                  }
                },
                disabled: isHeadingID,
                label: t('actions.update', {
                  defaultValue: 'Update',
                }),
              },
            }}
          />
        </ButtonGroup>
      </div>
    </div>
  );
};
