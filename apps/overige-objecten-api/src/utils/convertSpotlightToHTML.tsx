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

export const convertSpotlightToHTML = (item: convertSpotlightToHTMLProps['item']) => {
  return renderToString(
    <section>
      <Markdown>{item?.content}</Markdown>
      {item?.logoButton && item.logoButton.map((btn, index: number) => <BasicLogoButton item={btn} key={index} />)}
    </section>,
  );
};
