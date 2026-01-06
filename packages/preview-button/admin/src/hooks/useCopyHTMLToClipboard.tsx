import { useNotification } from '@strapi/helper-plugin';
import { getTrad } from '../utils';

const useCopyHTMLToClipboard = () => {
  const toggleNotification = useNotification();

  const copyHTMLToClipboard = async (content: string = '') => {
    // Validate the content
    if (!content || typeof content !== 'string') {
      throw new Error('Invalid content provided for copying');
    }
    // Create a Blob and ClipboardItem for the HTML content
    const blob = new Blob([content], { type: 'text/html' });
    const data = [new ClipboardItem({ 'text/html': blob })];
    try {
      // Write to clipboard
      await navigator.clipboard.write(data);
      // Show success notification
      toggleNotification({
        type: 'success',
        message: {
          id: getTrad('alert.htmlContentCopiedSuccess'),
          defaultMessage: 'HTML content copied to clipboard! Paste into Word.',
        },
      });
    } catch (error) {
      // Log detailed error for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to copy the HTML content:', error instanceof Error ? error.message : error);

      // Show error notification
      toggleNotification({
        type: 'warning',
        message: {
          id: getTrad('alert.htmlContentCopiedError'),
          defaultMessage: 'Failed to copy the HTML content',
        },
      });
    }
  };

  return copyHTMLToClipboard;
};

export default useCopyHTMLToClipboard;
