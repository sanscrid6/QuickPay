import { createEffect, createEvent, createStore, sample } from 'effector';
import { ServiceNode } from '../tree/types';
import { logOut } from '../user';
import { addService, getAllServices } from '../../api/backend';

type Service = ServiceNode;

export const $service = createStore<Service | null>(null);
export const setService = createEvent<Service | null>();
export const $servicesList = createStore<Service[]>([]);

export const getServiceListFx = createEffect(getAllServices);

export const addServiceFx = createEffect(addService);

// sample({
//   clock: getServiceListFx.doneData,
//   target: $servicesList,
// });

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
