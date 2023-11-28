import styles from './header.module.css';
import { routes } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { $user } from '../../state/user';
import { useStore } from 'effector-react';
import { forwardRef } from 'react';
import { ModalType, openModal } from '../../state/modal';

export const Header = forwardRef<HTMLElement | null>((_, ref) => {
  const user = useStore($user);

  function signInHandler() {
    openModal(ModalType.SignIn);
  }

  function logInHandler() {
    openModal(ModalType.LogIn);
  }

  return (
    <header className={styles.container} ref={ref}>
      <nav className={styles.navigation}>
        {routes
          .filter(({ path, isAuthed }) => isAuthed && path !== '/')
          .map(({ path, name }) => {
            if (!user) return null;

            return (
              <Link to={path} className={styles.link} key={name}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ paddingLeft: '0.5rem' }}
                >
                  {name}
                </Typography>
              </Link>
            );
          })}
      </nav>
      {!user && (
        <div className={styles.signContainer}>
          <Button onClick={logInHandler}>Log in</Button>
          <Button onClick={signInHandler}>Sign in</Button>
        </div>
      )}
      {user && (
        <Typography variant="h6" component="div">
          {user.firstName} {user.lastName}
        </Typography>
      )}
    </header>
  );
});
