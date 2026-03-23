import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const getPurify = () => {
  if (typeof window !== 'undefined') {
    return DOMPurify;
  }
  const { window: jsdomWindow } = new JSDOM('');
  return DOMPurify(jsdomWindow);
};

const purify = getPurify();

export const sanitizeHTML = (html: string) =>
  purify.sanitize(html, {
    FORBID_ATTR: ['style'],
    ADD_TAGS: ['iframe'],
  });
