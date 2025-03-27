// https://github.com/focus-trap/tabbable?tab=readme-ov-file#testing-in-jsdom
const lib = jest.requireActual('tabbable');
const tabbable = {
  ...lib,
  tabbable: (node, options) => lib.tabbable(node, { ...options, displayCheck: 'none' }),
  focusable: (node, options) => lib.focusable(node, { ...options, displayCheck: 'none' }),
  isFocusable: (node, options) => lib.isFocusable(node, { ...options, displayCheck: 'none' }),
  isTabbable: (node, options) => lib.isTabbable(node, { ...options, displayCheck: 'none' }),
};
// eslint-disable-next-line no-undef
module.exports = tabbable;
