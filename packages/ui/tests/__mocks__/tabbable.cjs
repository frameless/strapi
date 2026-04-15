/* eslint-disable no-undef */
// https://github.com/focus-trap/tabbable?tab=readme-ov-file#testing-in-jsdom
module.exports = {
  tabbable: (node) =>
    Array.from(
      node.querySelectorAll("a,button,input,select,textarea,[tabindex]"),
    ).filter(
      (el) =>
        !el.hasAttribute("disabled") && el.getAttribute("tabindex") !== "-1",
    ),
  focusable: (node) =>
    Array.from(
      node.querySelectorAll("a,button,input,select,textarea,[tabindex]"),
    ).filter((el) => !el.hasAttribute("disabled")),
  isFocusable: () => true,
  isTabbable: () => true,
  getTabIndex: (node) => {
    const tabindex = node.getAttribute("tabindex");
    return tabindex ? parseInt(tabindex, 10) : 0;
  },
  getClientIncludedElement: (node) => node,
};
