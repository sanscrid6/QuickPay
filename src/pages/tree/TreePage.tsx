import { useStore } from 'effector-react';
import { $tree, TreeNode, loadTreeFx } from '../../state/tree';
import styles from './tree-page.module.css';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useEffect } from 'react';

function render(node: TreeNode) {
  if (node.children) {
    return (
      <TreeItem nodeId={node.id} label={node.name} key={node.id}>
        {node.children.map(render)}
      </TreeItem>
    );
  }

  return <TreeItem nodeId={node.id} label={node.name} key={node.id} />;
}

export function TreePage() {
  const tree = useStore($tree);

  useEffect(() => {
    loadTreeFx();
  }, []);

  function selectNodeHandler() {
    console.log('select');
  }

  return (
    <main>
      <section className={styles.treeContainer}>
        {tree?.children && (
          <TreeView onNodeSelect={selectNodeHandler}>
            {tree.children.map(render)}
          </TreeView>
        )}
      </section>
    </main>
  );
}
