import { ListItem, ListItemText } from '@mui/material';
import { Service } from '../../types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  $favourites,
  $user,
  createFavouriteFx,
  deleteFavouriteFx,
} from '../../../../state/user/user';
import { useUnit } from 'effector-react';

type ServiceCardProps = Service & {
  onClick: (id: string) => void;
  isSelected: boolean;
};

function ServiceCard(props: ServiceCardProps) {
  const user = useUnit($user);
  const favourites = useUnit($favourites);

  function clickHandler() {
    props.onClick(props.id);
  }

  async function addFavourite(e: React.MouseEvent) {
    e.stopPropagation();
    await createFavouriteFx({
      userId: user!.id,
      serviceId: props.id,
    });
  }

  async function removeFavourite(e: React.MouseEvent) {
    e.stopPropagation();
    await deleteFavouriteFx({
      id: favourites.find((f) => f.serviceId === props.id)!.id,
    });
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
      {favourites.map((f) => f.serviceId).includes(props.id) ? (
        <FavoriteIcon color="error" onClick={removeFavourite} />
      ) : (
        <FavoriteBorderIcon color="error" onClick={addFavourite} />
      )}
    </ListItem>
  );
}

export default ServiceCard;
