import { createEffect, createEvent, createStore, sample } from 'effector';
import { ServiceNode } from './tree/types';
import { logOut } from './user';
import { AddServiceRequest } from '../api/types';
import { addService, linkServiceToFolder } from '../api/backend';
import { loadTreeFx } from './tree/tree';

type Service = ServiceNode;
type AddService = AddServiceRequest & {
  folderId: string;
};

export const $service = createStore<Service | null>(null);
export const setService = createEvent<Service | null>();

export const addServiceFx = createEffect(async (info: AddService) => {
  const { id } = await addService(info);
  await linkServiceToFolder({ serviceId: id, folderId: info.folderId });
});

sample({
  clock: addServiceFx.doneData,
  target: loadTreeFx,
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
