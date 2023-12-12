import { createEffect, createEvent, createStore, sample } from 'effector';
import { ServiceNode } from '../tree/types';
import { $user, getWalletListFx, logOut } from '../user/user';
import {
  addService,
  createPayment,
  getAllCategories,
  getAllServices,
} from '../../api/backend';
import { addToast } from '../toast/toast';

type Service = ServiceNode;
export type Category = {
  id: string;
  color: string;
  title: string;
  description: string;
};

export const $categoryList = createStore<Category[]>([]);
export const $service = createStore<Service | null>(null);
export const $servicesList = createStore<Service[]>([]);

export const setService = createEvent<Service | null>();
export const getServiceListFx = createEffect(getAllServices);
export const getCategoryListFx = createEffect(getAllCategories);

export const addServiceFx = createEffect(addService);

export const createPaymentFx = createEffect(createPayment);

sample({
  clock: createPaymentFx.doneData,
  target: getWalletListFx,
});

sample({
  clock: createPaymentFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: createPaymentFx.doneData,
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: addServiceFx.doneData,
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: addServiceFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: $user.updates,
  target: getServiceListFx,
});

sample({
  clock: getCategoryListFx.doneData,
  target: $categoryList,
});

sample({
  clock: $user.updates,
  target: getCategoryListFx,
});

sample({
  clock: getServiceListFx.doneData,
  target: $servicesList,
});

sample({
  clock: addServiceFx.doneData,
  target: getServiceListFx,
});

sample({
  clock: setService,
  target: $service,
});

sample({
  clock: logOut,
  fn: () => null,
  target: $service,
});
