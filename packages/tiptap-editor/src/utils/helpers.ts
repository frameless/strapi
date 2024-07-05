export const addRemoveFromList = (list: any, val: any) => {
  if (!list.includes(val)) {
    list.push(val);
  } else {
    list.splice(list.indexOf(val), 1);
  }
  return list;
};

const validProtocols = ['https://', 'http://', '#', 'tel:', 'mailto:'];
export const isValidURL = (url: string) => validProtocols.some((protocol) => url.startsWith(protocol));
