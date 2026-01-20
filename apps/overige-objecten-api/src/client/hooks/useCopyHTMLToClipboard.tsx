const useCopyHTMLToClipboard = () => {
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
    } catch (error) {
      // Log detailed error for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to copy the HTML content:', error instanceof Error ? error.message : error);
    }
  };

  return copyHTMLToClipboard;
};

export default useCopyHTMLToClipboard;
