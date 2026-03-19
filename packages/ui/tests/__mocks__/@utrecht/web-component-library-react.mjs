import React from 'react';

const createStub = (name) => {
  const Component = React.forwardRef((props, ref) => React.createElement(name, { ...props, ref }));
  Component.displayName = name;
  return Component;
};

export const UtrechtIconClose = createStub('utrecht-icon-close');
export const UtrechtIcon = createStub('utrecht-icon');
export const UtrechtIconArrow = createStub('utrecht-icon-arrow');
export const UtrechtIconCross = createStub('utrecht-icon-cross');
export const UtrechtIconHamburgerMenu = createStub('utrecht-icon-hamburger-menu');
