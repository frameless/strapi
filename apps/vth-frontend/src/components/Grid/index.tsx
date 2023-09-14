import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';
import './index.style.css';

type GridProps = HTMLAttributes<HTMLDivElement>;

export const Grid: FC<GridProps> = (props) => <div {...props} className={clsx('utrecht-grid', props.className)}></div>;
