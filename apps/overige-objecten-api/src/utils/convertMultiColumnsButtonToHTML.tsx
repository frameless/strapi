import { Heading } from '@utrecht/component-library-react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import type { LogoButtonItemType } from './convertLogoButtonToHTML';
import { BasicLogoButton, LogoButton } from './convertLogoButtonToHTML';

type MultiColumnsButtonType = {
  title: string;
  logoButton: LogoButtonItemType[];
};
interface MultiColumnsButtonProps {
  item: MultiColumnsButtonType;
  withDesignSystem?: boolean;
}

const MultiColumnsButton = ({ item, withDesignSystem }: MultiColumnsButtonProps) => {
  if (withDesignSystem) {
    return (
      <div style={{ display: 'inline-grid' }}>
        <Heading level={3}>{item.title}</Heading>
        {item.logoButton.map((btn: LogoButtonItemType, index: number) => (
          <LogoButton item={btn} headingLevel={4} key={index} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-grid' }}>
      <h3>{item.title}</h3>
      {item.logoButton.map((btn: LogoButtonItemType, index: number) => (
        <BasicLogoButton item={btn} headingLevel={4} key={index} />
      ))}
    </div>
  );
};

export const convertMultiColumnsButtonToHTML = (item: any, withDesignSystem?: boolean) =>
  item.column
    .map((col: any) =>
      renderToString(<MultiColumnsButton item={col} withDesignSystem={withDesignSystem} key={col.title} />),
    )
    .join('');
