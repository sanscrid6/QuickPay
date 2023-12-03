import { createEffect, createEvent, createStore, sample } from 'effector';
import { addFolder, getTree, linkServiceToFolder } from '../../api/backend';
import { logOut } from '../user';
import { search } from './functions';
import { Tree } from './types';
import { addToast } from '../toast';

export const setTree = createEvent<Tree>();
export const setTempTree = createEvent<Tree | null>();

export const setSearch = createEvent<string>();
export const setExpanded = createEvent<string[] | undefined>();

export const $tempTree = createStore<Tree | null>(null);
export const $tree = createStore<Tree | null>(null);

export const $search = createStore('');
export const $expanded = createStore<string[] | undefined>(undefined, {
  skipVoid: false,
});

export const loadTreeFx = createEffect(getTree);
export const addFolderFx = createEffect(addFolder);
export const linkServiceToFolderFx = createEffect(linkServiceToFolder);

sample({
  clock: addFolderFx.doneData,
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: linkServiceToFolderFx.doneData,
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: addFolderFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: linkServiceToFolderFx.failData,
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: linkServiceToFolderFx.doneData,
  target: loadTreeFx,
});

sample({
  clock: setExpanded,
  target: $expanded,
});

sample({
  clock: addFolderFx.doneData,
  target: loadTreeFx,
});

sample({
  clock: $search.updates,
  source: {
    name: $search,
    tree: $tree,
  },
  fn: search,
  target: $tempTree,
});

sample({
  clock: setSearch,
  target: $search,
});

sample({
  clock: setTree,
  target: $tree,
});

sample({
  clock: $tree.updates,
  target: $tempTree,
});

sample({
  clock: setTempTree,
  target: $tempTree,
});

sample({
  clock: loadTreeFx.doneData,
  target: $tree,
});

sample({
  clock: logOut,
  fn: () => null,
  target: $tree,
});
