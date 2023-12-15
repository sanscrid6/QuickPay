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
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {service.category.title}
            </Typography>{' '}
            <span>{`Сумма ${amount} BYN`}</span>
            <span>{`${formatter.format(
              new Date(
                new Date(dateTime).getTime() +
                  new Date().getTimezoneOffset() * -60_000,
              ),
            )}`}</span>
          </span>
        }
      />
    </ListItem>
  );
}

export default HistoryCard;
