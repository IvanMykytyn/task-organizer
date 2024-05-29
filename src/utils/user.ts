import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localStorage';

export const getIsLoggedIn = () => getFromLocalStorage('token');

export const removeUserFromLocalStorage = () => {
  removeFromLocalStorage('token');
};

export const addUserToLocalStorage = (token: string) => {
  addToLocalStorage('token', token);
};
