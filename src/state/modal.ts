import { createEvent, createStore, sample } from 'effector';

export enum ModalType {
  SignIn = 'SIGNIN',
  LogIn = 'LOGIN',
}

export const $modal = createStore<ModalType | null>(null);

export const openModal = createEvent<ModalType>();
export const closeModal = createEvent();

sample({
  clock: openModal,
  target: $modal,
});

sample({
  clock: closeModal,
  fn: () => null,
  target: $modal,
});
