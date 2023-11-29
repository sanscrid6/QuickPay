import { createEvent, createStore, sample } from 'effector';
import { ServiceNode } from './tree';

type Service = ServiceNode;

export const $service = createStore<Service | null>(null);
export const setService = createEvent<Service | null>();

sample({
  clock: setService,
  target: $service,
});
