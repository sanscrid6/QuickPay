import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { $modal, ModalType, closeModal } from '../../state/modal';
import { useUnit } from 'effector-react';
import { z } from 'zod';
import { addFolderFx, linkServiceToFolderFx } from '../../state/tree/tree';
import ServiceList from '../../pages/services/components/service-list/ServiceList';
import { $servicesList } from '../../state/service/service';
import { useEffect, useState } from 'react';

export function LinkServiceToFolderModal() {
  const modal = useUnit($modal);
  const pending = useUnit(addFolderFx.pending);
  const services = useUnit($servicesList);

  const [selectedService, setSelectedService] = useState(services[0]?.id ?? '');

  useEffect(() => {
    setSelectedService(services[0]?.id);
  }, []);

  function closeHandler() {
    closeModal();
  }

  async function submit() {
    if (pending) return;

    const folder = z.object({ folderId: z.string() }).parse(modal?.data);

    await linkServiceToFolderFx({
      ...folder,
      serviceId: selectedService,
    });
    closeHandler();
  }

  function itemClickHandler(id: string) {
    setSelectedService(id);
  }

  return (
    <Dialog
      open={modal?.type === ModalType.LinkServiceToFolder}
      onClose={closeHandler}
    >
      <DialogTitle>Добавить попку</DialogTitle>
      <DialogContent>
        <DialogContentText>Выберите услугу</DialogContentText>
        <ServiceList
          items={services}
          onItemClick={itemClickHandler}
          selectedId={selectedService}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Отмена</Button>
        <Button onClick={submit}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
}
