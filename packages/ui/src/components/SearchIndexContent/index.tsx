import { DetailedHTMLProps, HTMLAttributes } from 'react';

const escapeComment = (data: any) => String(data).replace(/--/g, '-\u200B-');

const HTMLComment = ({ data }: any) => (
  <noscript dangerouslySetInnerHTML={{ __html: `<!--${escapeComment(data)}-->` }} />
);

interface SearchIndexContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
//This code was requested from https://developer.pandosearch.com/ when we implemented the PDE proof of concept.
// So, we need to validate later when we get the actual URLs.
export const SearchIndexContent = ({ children }: SearchIndexContentProps) => (
  <>
    <HTMLComment data="TYPO3SEARCH_begin" />
    {children}
    <HTMLComment data="TYPO3SEARCH_end" />
  </>
);
