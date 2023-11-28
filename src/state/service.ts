import { createStore } from 'effector';

type Service = {
  title: string;
  description: string;
  inputs: string[];
};

export const $service = createStore<Service | null>(null);
