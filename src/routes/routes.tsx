import { TreePage } from '../pages/tree/TreePage';
import { UserPage } from '../pages/user/UserPage';
import { MainPage } from '../pages/main/MainPage';

export const routes = [
  {
    path: '/tree',
    element: <TreePage />,
    name: 'Payment tree',
    isAuthed: true,
  },
  {
    path: '/user',
    element: <UserPage />,
    name: 'User page',
    isAuthed: true,
  },
  {
    path: '/',
    element: <MainPage />,
    name: 'Main page',
  },
];

// export const router = createBrowserRouter(routes);
