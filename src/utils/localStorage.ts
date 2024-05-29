export const addToLocalStorage = (property: string, value: unknown) => {
  localStorage.setItem(property, JSON.stringify(value));
};

export const removeFromLocalStorage = (property: string) => {
  localStorage.removeItem(property);
};

export const getFromLocalStorage = (property: string) => {
  const storageValue = localStorage.getItem(property);
  const value = storageValue ? JSON.parse(storageValue) : null;
  return value;
};
