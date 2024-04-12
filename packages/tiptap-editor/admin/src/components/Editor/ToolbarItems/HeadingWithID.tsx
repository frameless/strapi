import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  IconButton,
  IconButtonGroup,
  TextInput,
  Typography,
} from '@strapi/design-system';
import type { Editor as EditorTypes } from '@tiptap/react';
import classnames from 'classnames';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { FaAnchor } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { RxUpdate } from 'react-icons/rx';
import { useIntl } from 'react-intl';
import slugify from 'slugify';
import { getTrad } from '../../../utils';
interface ToolbarItemHeadingWithIDProps {
  editor: EditorTypes;
}
export const ToolbarItemHeadingWithID = ({ editor }: ToolbarItemHeadingWithIDProps) => {
  if (!editor) return null;
  const { selection } = editor.state;
  const { $from } = selection;
  const node = $from.node($from.depth);
  const isHeadingActive = editor.isActive('heading');
  const currentHeadingID = editor.getAttributes('heading')?.id;
  const headingLevel = editor.getAttributes('heading')?.level;
  const [headingID, setHeadingID] = useState<string>('');
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<Boolean>(false);
  const [updateHeadingID, setUpdateHeadingID] = useState<Boolean>(false);
  const { formatMessage } = useIntl();
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
  const createAnchorLink = (text: string) => {
    return slugify(text, {
      replacement: '-',
      lower: true,
      strict: true,
      locale: 'nl',
      trim: true,
    });
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Error copying to clipboard: ${error}`);
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

  const generatedID = createAnchorLink(node.textContent);
  const isHeadingID = headingID.trim().length === 0;

  const updateTextFormatMessage = formatMessage({
    id: getTrad('common.action.update'),
    defaultMessage: 'Update',
  });
  const generateFormatMessage = formatMessage({
    id: getTrad('common.action.generate'),
    defaultMessage: 'Generate',
  });
  const headingTextFormatMessage = formatMessage({
    id: getTrad('common.action.heading'),
    defaultMessage: 'Heading',
  });
  const closeTextFormatMessage = formatMessage({
    id: getTrad('common.action.close'),
    defaultMessage: 'Close',
  });
  const dialogTitleFormatMessage = formatMessage(
    {
      id: getTrad('components.toolbar.headingWithID.dialog.title'),
      defaultMessage: `${
        updateHeadingID ? updateTextFormatMessage : generateFormatMessage
      } ${headingTextFormatMessage} ID`,
    },
    {
      heading: headingTextFormatMessage,
      state: updateHeadingID ? updateTextFormatMessage : generateFormatMessage,
    },
  );
  const alertTitleFormatMessage = formatMessage(
    {
      id: updateHeadingID
        ? getTrad('components.toolbar.headingWithID.alert.title.update')
        : getTrad('components.toolbar.headingWithID.alert.title.generate'),
      defaultMessage: 'The Heading ID generated successfully!',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const alertDescriptionFormatMessage = formatMessage({
    id: getTrad('components.toolbar.headingWithID.alert.description'),
    defaultMessage: 'ID copied to clipboard:',
  });
  const inputLabelFormatMessage = formatMessage(
    {
      id: getTrad('components.toolbar.headingWithID.input.label'),
      defaultMessage: 'Heading ID',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const inputPlaceholderFormatMessage = formatMessage(
    {
      id: getTrad('components.toolbar.headingWithID.input.placeholder'),
      defaultMessage: 'Enter a unique ID',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const inputHintFormatMessage = formatMessage(
    {
      id: getTrad('components.toolbar.headingWithID.input.hint'),
      defaultMessage: 'The ID will be used to create a link to this heading',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const inputErrorFormatMessage = formatMessage({
    id: getTrad('components.toolbar.headingWithID.input.error'),
    defaultMessage: 'This field is required',
  });
  const iconButtonGenerateLabelFormatMessage = formatMessage(
    {
      id: getTrad('components.toolbar.headingWithID.iconButton.generate.label'),
      defaultMessage: `Generate ID for heading-${headingLevel} and copy`,
    },
    {
      headingLevel,
    },
  );
  const iconButtonEditLabelFormatMessage = formatMessage(
    {
      id: getTrad('components.toolbar.headingWithID.iconButton.edit.label'),
      defaultMessage: `Edit heading-${headingLevel} and copy`,
    },
    {
      headingLevel,
    },
  );
  return (
    <>
      <Dialog onClose={() => setIsVisible(false)} title={dialogTitleFormatMessage} isOpen={isVisible}>
        <DialogBody>
          {isAlertVisible && (
            <Alert
              title={alertTitleFormatMessage}
              variant="success"
              onClose={() => {
                setIsVisible(false);
                setUpdateHeadingID(false);
                setIsAlertVisible(false);
              }}
            >
              <Box marginTop={2}>
                <Typography variant="epsilon">{alertDescriptionFormatMessage}</Typography>
              </Box>
              <Box marginTop={1}>
                <Typography variant="pi">#{currentHeadingID}</Typography>
              </Box>
            </Alert>
          )}
          {updateHeadingID && (
            <Flex direction="column" alignItems="center" gap={2} marginTop={5}>
              <Flex justifyContent="center">
                <TextInput
                  label={inputLabelFormatMessage}
                  id="update-heading-id"
                  defaultValue={currentHeadingID}
                  placeholder={inputPlaceholderFormatMessage}
                  name="heading-id"
                  hint={inputHintFormatMessage}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setHeadingID(event.target.value)}
                  value={headingID}
                  error={isHeadingID && inputErrorFormatMessage}
                />
              </Flex>
            </Flex>
          )}
        </DialogBody>
        <DialogFooter
          startAction={
            <Button
              onClick={() => {
                setIsVisible(false);
                setUpdateHeadingID(false);
                setIsAlertVisible(false);
              }}
              variant="tertiary"
              startIcon={<GrClose />}
            >
              {closeTextFormatMessage}
            </Button>
          }
          endAction={
            <Button
              disabled={isHeadingID}
              onClick={() => {
                setUpdateHeadingID(true);
                setIsAlertVisible(false);
                if (updateHeadingID) {
                  onHeadingClickHandler({ id: headingID, dialogVisibility: true });
                  setIsAlertVisible(true);
                }
              }}
              variant="success-light"
              startIcon={<RxUpdate />}
            >
              {updateTextFormatMessage}
            </Button>
          }
        />
      </Dialog>
      <IconButtonGroup className={classnames('button-group')}>
        <IconButton
          icon={<FaAnchor />}
          label={currentHeadingID ? iconButtonEditLabelFormatMessage : iconButtonGenerateLabelFormatMessage}
          disabled={!isHeadingActive}
          className={classnames('large-icon', {
            'is-active': currentHeadingID,
          })}
          onClick={() => {
            if (currentHeadingID) {
              onHeadingClickHandler({ id: currentHeadingID, dialogVisibility: true });
              setUpdateHeadingID(true);
            } else {
              onHeadingClickHandler({ id: generatedID, dialogVisibility: true });
              setIsAlertVisible(true);
            }
          }}
        />
      </IconButtonGroup>
    </>
  );
};
