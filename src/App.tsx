import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Header } from './layout/header/Header';
import { Router } from './routes/Router';
import { useEffect, useRef } from 'react';
import { useHeight } from './hooks/useHeight';
import { SignInModal } from './layout/modal/SignInModal';
import { LogInModal } from './layout/modal/LogInModal';
import { getUserFx } from './state/user';

const theme = createTheme();

function App() {
  const ref = useRef<HTMLElement | null>(null);
  const height = useHeight(ref);

  useEffect(() => {
    getUserFx(localStorage.getItem('userId')!);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header ref={ref} />
      <SignInModal />
      <LogInModal />
      <div style={{ height: `calc(100% - ${height}px)` }}>
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
