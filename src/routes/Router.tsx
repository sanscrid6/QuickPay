import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export function Router() {
  return (
    <Routes>
      {routes.map(({ path, element, name }) => (
        <Route path={path} element={element} key={name} />
      ))}
    </Routes>
  );
}
