import { createEffect, createEvent, createStore, sample } from 'effector';
import { getTree } from '../api/backend';
import { logOut } from './user';

export type Input = {
  label: string;
  name: string;
  type: 'text' | 'data' | 'number';
};

export type ServiceNode = {
  body: string;
  description: string;
  id: string;
  title: string;
  userId: string;
};

export type FolderNode = {
  folders?: FolderNode[];
  id: string;
  title: string;
  services?: ServiceNode[];
};

export type Tree = FolderNode[];

export type Node = FolderNode | ServiceNode;

export function isFolderNode(n: Node): n is FolderNode {
  return 'folders' in n;
}

// const mockTree: Tree = {
//   children: [
//     {
//       id: 'q',
//       name: 'Telefon',
//       type: 'FOLDER',
//       children: [
//         {
//           id: 'w',
//           name: 'Minsk',
//           type: 'FOLDER',
//           children: [
//             {
//               id: 'r',
//               name: 'a1',
//               type: 'PAYMENT',
//             },
//           ],
//         },
//         {
//           id: 'p',
//           name: 'Gomel',
//           type: 'FOLDER',
//           children: [
//             {
//               id: 'c',
//               name: 'a2',
//               type: 'PAYMENT',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

export const $tree = createStore<Tree | null>(null);

export const setTree = createEvent<Tree>();

export const loadTreeFx = createEffect(getTree);

sample({
  clock: setTree,
  target: $tree,
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
