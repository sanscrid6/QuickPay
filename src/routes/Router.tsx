import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { useStore } from 'effector-react';
import { $user } from '../state/user';

export function Router() {
  const user = useStore($user);

  return (
    <Routes>
      {routes.map(({ path, element, name, isAuthed }) => {
        if (isAuthed && !user) return null;

        return <Route path={path} element={element} key={name} />;
      })}
    </Routes>
  );
}
