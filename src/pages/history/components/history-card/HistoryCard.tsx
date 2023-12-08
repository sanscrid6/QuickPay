import { ListItem, ListItemText, Typography } from '@mui/material';
import { Payment } from '../../../../state/history/history';

type HistoryCardProps = Payment;

function HistoryCard({ amount, service }: HistoryCardProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={service.title}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {service.category.title}
            </Typography>{' '}
            {`Сумма ${amount} BYN`}
          </>
        }
      />
    </ListItem>
  );
}

export default HistoryCard;
