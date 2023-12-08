import { Payment } from '../state/history/history';
import { Category } from '../state/service/service';
import { FolderNode, ServiceNode } from '../state/tree/types';
import { Wallet } from '../state/user/user';

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginByCodeRequest = {
  code: string;
};

export type RefreshTokenRequest = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  birthDate: string;
};

export type Input = {
  label: string;
  type: 'text' | 'data' | 'number';
};

export type TreeResponse = FolderNode[];

export type AddFolderRequest = {
  folderId: string;
  title: string;
  userId: string;
};

export type AddServiceRequest = {
  walletId: string;
  categoryId: string;
  description: string;
  title: string;
  userId: string;
  body: string;
};

export type LinkServiceToFolderRequest = {
  serviceId: string;
  folderId: string;
};

export type GetServicesResponce = ServiceNode[];
export type GetCategoriesResponce = Category[];
export type GetWalletsResponce = Wallet[];

export type CreateWalletRequest = {
  title: string;
  userId: string;
};

export type UpdateWalletRequest = {
  id: string;
  amount: number;
};

export type CreatePaymentRequest = {
  userId: string;
  amount: number;
  serviceId: string;
  dateTime: string;
  walletId: string;
};

export type CreatePaymentResponce = Payment[];
