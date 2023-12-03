import { Alert, Snackbar } from '@mui/material';
import { $activeToast, popToast } from '../../state/toast';
import { useUnit } from 'effector-react';

function Toasts() {
  const activeToast = useUnit($activeToast);

  function showNextToast() {
    popToast();
  }

  function getText() {
    if (activeToast?.text) return activeToast?.text;

    if (activeToast?.type === 'ERROR') return 'Неизвестная ошибка';
    if (activeToast?.type === 'SUCCESS') return 'Операция прошла успешно';
  }

  return (
    <>
      {activeToast && (
        <Snackbar
          open={$activeToast !== null}
          autoHideDuration={6000}
          onClose={showNextToast}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={activeToast.type === 'SUCCESS' ? 'success' : 'error'}
            sx={{
              maxWidth: '20rem',
            }}
          >
            {getText()}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Toasts;
