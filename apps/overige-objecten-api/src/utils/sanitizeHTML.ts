import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { memoize } from 'lodash'; // For memoization of sanitize function
const createDOMPurify = memoize(() => {
  const { window } = new JSDOM();
  return DOMPurify(window);
});
const domPurify = createDOMPurify();
export const sanitizeHTML = (html: string) =>
  domPurify.sanitize(html, {
    FORBID_ATTR: ['style'],
    ADD_TAGS: ['iframe'],
  });
