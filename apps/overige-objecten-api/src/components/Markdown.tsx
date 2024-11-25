import React from 'react';
import xss from 'xss';

export const Markdown = ({ children }: { children: string }) =>
  children ? <div dangerouslySetInnerHTML={{ __html: xss(children) }} /> : null;
