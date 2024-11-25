import React from 'react';
import { renderToString } from 'react-dom/server';
import { BasicLogoButton } from './convertLogoButtonToHTML';
import { Markdown } from '../components/Markdown';
export const convertSpotlightToHTML = (item: any) => {
  return renderToString(
    <section>
      <Markdown>{item?.content}</Markdown>
      {item.logoButton && item.logoButton.map((btn: any, index: number) => <BasicLogoButton item={btn} key={index} />)}
    </section>,
  );
};
