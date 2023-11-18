import { createEvent, createStore, sample } from 'effector';

export type TreeNode = {
  id: string;
  name: string;
  type: 'FOLDER' | 'PAYMENT';
  children?: TreeNode[];
};

export type Tree = {
  children: TreeNode[];
};

const mockTree: Tree = {
  children: [
    {
      id: 'q',
      name: 'Telefon',
      type: 'FOLDER',
      children: [
        {
          id: 'w',
          name: 'Minsk',
          type: 'FOLDER',
          children: [
            {
              id: 'r',
              name: 'a1',
              type: 'PAYMENT',
            },
          ],
        },
        {
          id: 'p',
          name: 'Gomel',
          type: 'FOLDER',
          children: [
            {
              id: 'c',
              name: 'a2',
              type: 'PAYMENT',
            },
          ],
        },
      ],
    },
  ],
};

export const $tree = createStore<Tree | null>(mockTree);

export const setTree = createEvent<Tree>();

sample({
  clock: setTree,
  target: $tree,
});
