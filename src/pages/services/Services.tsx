import { useUnit } from 'effector-react';
import ServiceList from './components/service-list/ServiceList';
import {
  $servicesList,
  getServiceListFx,
  setService,
} from '../../state/service/service';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { ModalType, openModal } from '../../state/modal';
import styles from './service.module.css';
import Service from '../../components/service/Service';

function ServicesPage() {
  const services = useUnit($servicesList);

  useEffect(() => {
    getServiceListFx();
  }, []);

  useEffect(() => {
    return () => {
      setService(null);
    };
  }, []);

  function addServiceHandler() {
    openModal({ type: ModalType.AddService });
  }

  function itemClickHandler(id: string) {
    setService(services.find((s) => s.id === id)!);
  }

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <ServiceList items={services} onItemClick={itemClickHandler} />
        <Button onClick={addServiceHandler}>Добавить услугу</Button>
      </div>
      <Service />
    </div>
  );
}

export default ServicesPage;
