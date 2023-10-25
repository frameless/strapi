'use client';
import { ButtonProps } from '@utrecht/component-library-react';
import { Button } from '@utrecht/component-library-react/dist/css-module';
import React, { FC } from 'react';

export const PrintButton: FC<ButtonProps> = (props) => {
  return (
    <Button className={'utrecht-button--print'} onClick={() => print()} {...props}>
      Print
    </Button>
  );
};
