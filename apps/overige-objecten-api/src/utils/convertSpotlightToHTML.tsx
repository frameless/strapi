import React from 'react';
import { renderToString } from 'react-dom/server';
import { BasicLogoButton, LogoButtonItemType } from './convertLogoButtonToHTML';
import { Markdown } from '../components/Markdown';
interface convertSpotlightToHTMLProps {
  item: {
    content: string;
    logoButton: LogoButtonItemType[];
  };
}
/* 
  Using <figure> to get a default border since CSS is not allowed in the receiving system.
  This is technically a semantic misuse of <figure>, which is normally for self-contained media or illustrations.
  Adding role="group" improves accessibility by indicating this is a related group of content and interactive elements.
*/
export const convertSpotlightToHTML = (item: convertSpotlightToHTMLProps['item']) => {
  return renderToString(
    <figure role="group">
      <Markdown>{item?.content}</Markdown>
      {item?.logoButton && item.logoButton.map((btn, index) => <BasicLogoButton item={btn} key={index} />)}
    </figure>,
  );
};
