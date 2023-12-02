import { FolderNode, Node } from './types';
import { Tree } from './types';

export function isFolderNode(n: Node): n is FolderNode {
  return 'folders' in n;
}

export function search({ name, tree }: { name: string; tree: Tree | null }) {
  const r = new RegExp(name.toLowerCase());
  const result: Set<Node> = new Set();

  function helper({ root, curr }: { root: Node; curr: Node }) {
    if (r.test(curr.title.toLowerCase())) {
      result.add(root);

      return;
    } else {
      if (isFolderNode(curr)) {
        curr.folders?.forEach((f) => helper({ root, curr: f }));
        curr.services?.forEach((f) => helper({ root, curr: f }));
      }
    }
  }

  tree && tree.forEach((curr) => helper({ root: curr, curr }));

  return [...result];
}
