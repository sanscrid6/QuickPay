import { createEvent, createStore, sample } from 'effector';

export type User = {
  isAdmin: boolean;
  id: string;
};

const mockUser = {
  id: 'qq',
  isAdmin: false,
};

export const $user = createStore<User | null>(null);

export const setUser = createEvent<User>();

sample({
  clock: setUser,
  target: $user,
});
