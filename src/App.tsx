import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Header } from './layout/header/Header';
import { Router } from './routes/Router';
import { useEffect, useRef } from 'react';
import { useHeight } from './hooks/useHeight';
import { SignInModal } from './layout/modal/SignInModal';
import { LogInModal } from './layout/modal/LogInModal';
import { getUserFx } from './state/user/user';
import { AddFolderModal } from './layout/modal/AddFolderModal';
import { AddServiceModal } from './layout/modal/AddServiceModal';
import { AddMoneyModal } from './layout/modal/AddMoneyModal';
import { AddWalletModal } from './layout/modal/AddWalletModal';
import { LinkServiceToFolderModal } from './layout/modal/LinkServiceToFolder';
import Toasts from './components/toasts/Toasts';
import { useUnit } from 'effector-react';
import { $modal, ModalType } from './state/modal/modal';

const theme = createTheme();

function App() {
  const ref = useRef<HTMLElement | null>(null);
  const height = useHeight(ref);
  const modal = useUnit($modal);

  useEffect(() => {
    getUserFx(localStorage.getItem('userId')!);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header ref={ref} />
      <SignInModal />
      <LogInModal />
      <AddFolderModal />
      <AddServiceModal />
      <AddMoneyModal />
      {modal?.type === ModalType.AddWallet && <AddWalletModal />}
      <LinkServiceToFolderModal />

      <div style={{ height: `calc(100% - ${height}px)`, position: 'relative' }}>
        <Toasts />
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
