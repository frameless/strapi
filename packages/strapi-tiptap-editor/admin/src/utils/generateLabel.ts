import DOMPurify from 'dompurify';
import truncate from 'lodash.truncate';
import striptags from 'striptags';

interface GenerateLabelData {
  name: string;
  content: string;
  truncateLength?: number;
}
interface GenerateLabelReturnType {
  label: string;
  name: string;
  labelKey: string;
  content: string;
}
export const generateLabel = ({ name, content, truncateLength = 70 }: GenerateLabelData): GenerateLabelReturnType => {
  if (!content?.trim()) return { label: '', name, labelKey: '', content: '' };

  // Sanitize the content to remove all HTML tags
  const sanitizedContent = DOMPurify.sanitize(content, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

  // Decode HTML entities before stripping HTML tags
  const decodedContent =
    new DOMParser().parseFromString(sanitizedContent, 'text/html').documentElement.textContent || '';

  // Strip HTML tags but preserve new lines
  const plainText = striptags(decodedContent)
    .replace(/(\s|&nbsp;)+/g, ' ') // Replace any whitespace or non-breaking space with a single space
    .trim(); // Trim the result to remove leading/trailing spaces

  // Truncate the text safely without cutting words
  const label = truncate(plainText, {
    length: truncateLength, // The maximum string length, default is 70.
    separator: /,? +/, // Cut at spaces or commas
  });

  // Generate a unique key using the field name
  const labelKey = `richtextContent_${name}`;
  return { label, name, labelKey, content };
};

interface DispatchLabelProps extends GenerateLabelData {
  key: string;
  label: string;
}

export const dispatchLabel = ({ content, label, key, name }: DispatchLabelProps) => {
  try {
    if (typeof window === 'undefined') return;
    // Dispatch a custom event to notify about the label update
    window.dispatchEvent(
      new CustomEvent('labelUpdated', {
        detail: { key, label, name, value: content },
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in strapi-preview-button dispatching label update:', error);
  }
};
