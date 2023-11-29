import { useStore } from 'effector-react';
import { $tree, Node, isFolderNode, loadTreeFx } from '../../state/tree';
import styles from './tree-page.module.css';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useEffect } from 'react';
import Service from './service/Service';
import { $service, setService } from '../../state/service';

function render(node: Node) {
  if (isFolderNode(node)) {
    const result = [];

    result.push(...(node.folders ?? []));
    result.push(...(node.services ?? []));

    return (
      <TreeItem nodeId={node.id} label={node.title} key={node.id}>
        {result.map(render)}
      </TreeItem>
    );
  } else {
    return (
      <TreeItem
        nodeId={node.id}
        label={node.title}
        key={node.id}
        onDoubleClick={() => {
          setService(node);
        }}
      />
    );
  }
}

export function TreePage() {
  const tree = useStore($tree);
  const service = useStore($service);

  useEffect(() => {
    loadTreeFx();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.treeContainer}>
        {tree && <TreeView>{tree.map(render)}</TreeView>}
      </section>
      <section className={styles.serviceContainer}>
        {service && <Service />}
      </section>
    </main>
  );
}
