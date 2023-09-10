import { atom } from "jotai";

interface LoginState {
  loggedIn: boolean;
}

export const loginAtom = atom<LoginState>({
  loggedIn: false,
});
