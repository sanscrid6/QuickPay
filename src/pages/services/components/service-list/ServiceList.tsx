import { List } from '@mui/material';
import { Service } from '../../types';
import ServiceCard from '../service-card/ServiceCard';

type ServiceListProps = {
  items: Service[];
  onItemClick: (id: string) => void;
  selectedId?: string;
};

function ServiceList({ items, onItemClick, selectedId }: ServiceListProps) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        overflowY: 'auto',
        maxHeight: '500px',
      }}
    >
      {items.map((item) => (
        <ServiceCard
          key={item.id}
          {...item}
          onClick={onItemClick}
          isSelected={item.id === selectedId}
        />
      ))}
    </List>
  );
}

export default ServiceList;
