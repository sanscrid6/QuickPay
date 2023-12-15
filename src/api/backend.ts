import {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
  TreeResponse,
  AddFolderRequest,
  AddServiceRequest,
  LinkServiceToFolderRequest,
  LoginByCodeRequest,
  GetServicesResponce,
  GetCategoriesResponce,
  GetWalletsResponce,
  CreateWalletRequest,
  UpdateWalletRequest,
  CreatePaymentRequest,
  CreatePaymentResponce,
  AddFavouriteRequest,
  DeleteFavouriteRequest,
  GetUserFavouritesResponce,
} from './types';
import { request } from './utils';

export async function register(req: RegisterRequest) {
  const res = await request({
    method: 'POST',
    url: '/identity/signup',
    body: req,
  });

  return res;
}

export async function login(req: LoginRequest) {
  const res = await request({
    method: 'POST',
    url: '/identity/signin1',
    params: req,
  });

  return res!;
}

export async function loginByCode(req: LoginByCodeRequest) {
  const res = await request<LoginResponse>({
    method: 'POST',
    url: '/identity/signin2',
    params: req,
  });

  return res!;
}

export async function getUser(id: string) {
  const res = await request<UserResponse>({
    method: 'GET',
    url: `/users/${id}`,
  });

  return res!;
}

export async function getTree() {
  const tree = await request<TreeResponse>({
    method: 'GET',
    url: '/folders',
  });

  const user = localStorage.getItem('userId')!;

  return tree.filter((node) => node.userId === user);
}

export async function addFolder(req: AddFolderRequest) {
  return request({
    method: 'POST',
    url: '/folders',
    body: req,
  });
}

export async function addService(req: AddServiceRequest) {
  return request<{ id: string }>({
    method: 'POST',
    url: '/services',
    body: req,
  });
}

export async function linkServiceToFolder(req: LinkServiceToFolderRequest) {
  return request({
    method: 'POST',
    url: '/folder-services',
    body: req,
  });
}

export async function getAllServices() {
  return request<GetServicesResponce>({
    method: 'GET',
    url: '/services',
  });
}

export async function getAllCategories() {
  return request<GetCategoriesResponce>({
    method: 'GET',
    url: '/categories',
  });
}

export async function getAllWallets() {
  const user = localStorage.getItem('userId')!;

  return request<GetWalletsResponce>({
    method: 'GET',
    url: `/wallets/user-wallets/${user}`,
  });
}

export async function createWallet(req: CreateWalletRequest) {
  return request({
    method: 'POST',
    url: '/wallets',
    body: req,
  });
}

export async function updateWallet(req: UpdateWalletRequest) {
  return request({
    method: 'PUT',
    url: '/wallets',
    body: req,
  });
}

export async function deleteWallet(id: string) {
  return request({
    method: 'DELETE',
    url: `/wallets/${id}`,
  });
}

export async function createPayment(req: CreatePaymentRequest) {
  return request({
    method: 'POST',
    url: `/payments`,
    body: req,
  });
}

export async function getPayments() {
  const user = localStorage.getItem('userId')!;

  const res = await request<CreatePaymentResponce>({
    method: 'GET',
    url: `/payments`,
  });

  return res.filter((p) => p.userId === user);
}

export async function addFavourite(req: AddFavouriteRequest) {
  return request({
    method: 'POST',
    url: `/user-favourites`,
    body: req,
  });
}

export async function deleteFavourite(req: DeleteFavouriteRequest) {
  return request({
    method: 'DELETE',
    url: `/user-favourites/${req.id}`,
  });
}

export async function getFavourites() {
  return request<GetUserFavouritesResponce>({
    method: 'GET',
    url: `/user-favourites`,
  });
}
