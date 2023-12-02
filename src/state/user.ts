import { createEffect, createEvent, createStore, sample } from 'effector';
import { getUser, login, register } from '../api/backend';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

// const mockUser = {
//   id: 'qq',
//   isAdmin: false,
// };

export const $user = createStore<User | null>(null);

export const setUser = createEvent<User>();

export const loginFx = createEffect(login);
export const registerFx = createEffect(register);
export const getUserFx = createEffect(getUser);

export const logOut = createEvent();

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

loginFx.doneData.watch(({ accessToken, refreshToken, userId }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', userId);
});

sample({
  clock: loginFx.doneData,
  fn: ({ userId }) => {
    return userId;
  },
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $user,
});
