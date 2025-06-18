export const getItemFromStorage = (itemName: string) => {
  const item = localStorage.getItem(itemName);

  if (item !== null) return JSON.parse(item);

  return null;
};

export const setItemInStorage = <T>(itemName: string, itemValue: T) =>
  localStorage.setItem(itemName, JSON.stringify(itemValue));

export const removeItemFromStorage = (itemName: string) =>
  localStorage.removeItem(itemName);
