import { create } from 'zustand';

import { getIsLoggedIn, removeUserFromLocalStorage } from '../utils/user';

type AuthState = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLogged: getIsLoggedIn() || false,
  setIsLogged: (isLogged: boolean) => set(() => ({ isLogged })),
  logout: () => {
    removeUserFromLocalStorage();
    return set({ isLogged: false });
  },
}));
