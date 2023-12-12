import { ListItem, ListItemText, Typography } from '@mui/material';
import { Payment } from '../../../../state/history/history';

type HistoryCardProps = Payment;

const formatter = Intl.DateTimeFormat('ru', {
  day: '2-digit',
  hour: '2-digit',
  month: 'long',
  year: 'numeric',
  minute: '2-digit',
});

function HistoryCard({ amount, service, dateTime }: HistoryCardProps) {
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
            <div>{`Сумма ${amount} BYN`}</div>
            <div>{`${formatter.format(new Date(dateTime))}`}</div>
          </>
        }
      />
    </ListItem>
  );
}

export default HistoryCard;
