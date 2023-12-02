import { useUnit } from 'effector-react';
import {
  $search,
  $tempTree,
  loadTreeFx,
  setSearch,
} from '../../state/tree/tree';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useEffect } from 'react';
import { $service, setService } from '../../state/service';
import { InputAdornment, TextField } from '@mui/material';
import { isFolderNode } from '../../state/tree/functions';
import { Node } from '../../state/tree/types';

import SearchIcon from '@mui/icons-material/Search';
import Service from './service/Service';
import AddIcon from '@mui/icons-material/Add';
import styles from './tree-page.module.css';

function RenderText({ text }: { text: string }) {
  const search = useUnit($search);

  const regexp = new RegExp(`(${search.toLowerCase()})`);
  const match = text.toLowerCase().match(regexp);

  if (!match) return text;

  const start = match.index!;
  const len = match[0].length;

  return (
    <>
      {text.substring(0, start)}
      <span className={styles.selectedText}>
        {text.substring(start, start + len)}
      </span>
      {text.substring(start + len, text.length)}
    </>
  );
}

function render(node: Node) {
  if (isFolderNode(node)) {
    const result = [];

    result.push(...(node.folders ?? []));
    result.push(...(node.services ?? []));

    return (
      <TreeItem
        nodeId={node.id}
        label={<RenderText text={node.title} />}
        key={node.id}
      >
        {result.map(render)}
        <button className={styles.addButton}>
          <AddIcon />
        </button>
      </TreeItem>
    );
  } else {
    return (
      <TreeItem
        nodeId={node.id}
        label={<RenderText text={node.title} />}
        key={node.id}
        onDoubleClick={() => {
          setService(node);
        }}
      />
    );
  }
}

export function TreePage() {
  const tree = useUnit($tempTree);
  const service = useUnit($service);
  const search = useUnit($search);

  useEffect(() => {
    loadTreeFx();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.treeContainer}>
        <div className={styles.search}>
          <TextField
            id="input-with-icon-textfield"
            label="Поиск"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        {tree && <TreeView>{tree.map(render)}</TreeView>}
      </section>
      <section className={styles.serviceContainer}>
        {service && <Service />}
      </section>
    </main>
  );
}
