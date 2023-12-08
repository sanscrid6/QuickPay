import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  createWallet,
  deleteWallet,
  getAllWallets,
  getUser,
  login,
  loginByCode,
  register,
  updateWallet,
} from '../../api/backend';
import { addToast } from '../toast/toast';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type Wallet = {
  id: string;
  title: string;
  amount: number;
  isMain: boolean;
};

export const $user = createStore<User | null>(null);
export const $walletList = createStore<Wallet[]>([]);

export const setUser = createEvent<User>();

export const updateWalletFx = createEffect(updateWallet);
export const deleteWalletFx = createEffect(deleteWallet);
export const createWalletFx = createEffect(createWallet);
export const getWalletListFx = createEffect(getAllWallets);

export const loginFx = createEffect(login);
export const loginByCodeFx = createEffect(loginByCode);
export const registerFx = createEffect(register);
export const getUserFx = createEffect(getUser);

export const logOut = createEvent();

loginByCodeFx.doneData.watch(({ accessToken, refreshToken, userId }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', userId);
});

sample({
  clock: loginFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: updateWalletFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: updateWalletFx.doneData,
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: createWalletFx.doneData,
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: createWalletFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: loginByCodeFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: $user.updates,
  target: getWalletListFx,
});

sample({
  clock: getWalletListFx.doneData,
  target: $walletList,
});

sample({
  clock: updateWalletFx.doneData,
  target: getWalletListFx,
});

sample({
  clock: createWalletFx.doneData,
  target: getWalletListFx,
});

sample({
  clock: logOut,
  fn: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    return null;
  },
  target: $user,
});

sample({
  clock: setUser,
  target: $user,
});

sample({
  clock: loginByCodeFx.doneData,
  fn: ({ userId }) => {
    return userId;
  },
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $user,
});
