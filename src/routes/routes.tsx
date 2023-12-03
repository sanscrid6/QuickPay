import { TreePage } from '../pages/tree/TreePage';
import { MainPage } from '../pages/main/MainPage';
import ServicesPage from '../pages/services/Services';
import { WalletPage } from '../pages/wallet/WaletPage';

export const routes = [
  {
    path: '/tree',
    element: <TreePage />,
    name: 'Дерево услуг',
    isAuthed: true,
  },
  {
    path: '/services',
    element: <ServicesPage />,
    name: 'Услуги',
    isAuthed: true,
  },
  {
    path: '/wallets',
    element: <WalletPage />,
    name: 'Кошельки',
    isAuthed: true,
  },
  {
    path: '/',
    element: <MainPage />,
    name: 'Main page',
  },
];
