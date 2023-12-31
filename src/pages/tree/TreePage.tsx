import { useUnit } from 'effector-react';
import {
  $search,
  $tempTree,
  loadTreeFx,
  setSearch,
} from '../../state/tree/tree';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { setService } from '../../state/service/service';
import { InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import { isFolderNode } from '../../state/tree/functions';
import { Node } from '../../state/tree/types';

import SearchIcon from '@mui/icons-material/Search';
import Service from '../../components/service/Service';
import styles from './tree-page.module.css';
import { ModalType, closeModal, openModal } from '../../state/modal/modal';

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

function RenderNode({
  node,
  onContextMenu,
}: {
  node: Node;
  onContextMenu: (e: MouseEvent<HTMLElement>, data: unknown) => void;
}) {
  if (isFolderNode(node)) {
    const result = [];

    result.push(...(node.folders ?? []));
    result.push(...(node.services ?? []));

    return (
      <TreeItem
        nodeId={node.id}
        ContentProps={{
          onContextMenu: (e) => onContextMenu(e, { folderId: node.id }),
        }}
        label={<RenderText text={node.title} />}
      >
        {result.map((n) => (
          <RenderNode node={n} onContextMenu={onContextMenu} key={n.id} />
        ))}
      </TreeItem>
    );
  }

  return (
    <TreeItem
      nodeId={node.id}
      label={<RenderText text={node.title} />}
      onDoubleClick={() => {
        setService(node);
      }}
    />
  );
}

export function TreePage() {
  const tree = useUnit($tempTree);
  const search = useUnit($search);

  const [menuData, setMenuData] = useState<null | {
    anchor: HTMLElement;
    data?: unknown;
  }>(null);

  useEffect(() => {
    loadTreeFx();
  }, []);

  useEffect(() => {
    closeModal.watch(() => {
      setMenuData(null);
    });
  }, []);

  const openContextMenuHandler = useCallback(
    (e: MouseEvent<HTMLElement>, data?: unknown) => {
      e.preventDefault();
      e.stopPropagation();
      setMenuData({ anchor: e.currentTarget, data });
    },
    [],
  );

  const closeContextMenuHandler = useCallback(() => {
    setMenuData(null);
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.treeContainer}>
        <div className={styles.controlsContainer}>
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
        <Menu
          id="basic-menu"
          anchorEl={menuData?.anchor}
          open={!!menuData}
          onClose={closeContextMenuHandler}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() =>
              openModal({ type: ModalType.AddFolder, data: menuData?.data })
            }
          >
            Cоздать папку
          </MenuItem>
          <MenuItem
            onClick={() =>
              openModal({
                type: ModalType.LinkServiceToFolder,
                data: menuData?.data,
              })
            }
          >
            Создать услугу
          </MenuItem>
        </Menu>
        {tree && (
          <TreeView>
            {tree.map((n) => (
              <RenderNode
                node={n}
                onContextMenu={openContextMenuHandler}
                key={n.id}
              />
            ))}
          </TreeView>
        )}
      </section>
      <section className={styles.serviceContainer}>
        <Service />
      </section>
    </main>
  );
}
