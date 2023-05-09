export const addRemoveFromList = (list: any, val: any) => {
  if (!list.includes(val)) {
    list.push(val);
  } else {
    list.splice(list.indexOf(val), 1);
  }
  return list;
};
