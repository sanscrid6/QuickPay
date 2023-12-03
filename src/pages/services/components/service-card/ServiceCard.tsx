import { ListItem, ListItemText } from '@mui/material';
import { Service } from '../../types';

type ServiceCardProps = Service & {
  onClick: (id: string) => void;
  isSelected: boolean;
};

function ServiceCard(props: ServiceCardProps) {
  function clickHandler() {
    props.onClick(props.id);
  }

  return (
    <ListItem
      alignItems="flex-start"
      onClick={clickHandler}
      sx={{
        cursor: 'pointer',
        bgcolor: props.isSelected ? '#EAEAEA' : 'background.paper',
      }}
    >
      <ListItemText primary={props.title} secondary={props.description} />
    </ListItem>
  );
}

export default ServiceCard;
