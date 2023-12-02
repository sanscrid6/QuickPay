import {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
  TreeResponse,
  AddFolderRequest,
  AddServiceRequest,
  LinkServiceToFolderRequest,
} from './types';
import { request } from './utils';

export async function register(data: RegisterRequest) {
  const res = await request({
    method: 'POST',
    url: '/identity/signup',
    body: data,
  });

  return res;
}

export async function login(data: LoginRequest) {
  const res = await request<LoginResponse>({
    method: 'POST',
    url: '/identity/signin',
    params: data,
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
  return request<TreeResponse>({
    method: 'GET',
    url: '/Folders',
  });
}

export async function addFolder(req: AddFolderRequest) {
  return request({
    method: 'POST',
    url: '/Folders',
    body: req,
  });
}

export async function addService(req: AddServiceRequest) {
  return request<{ serviceId: string }>({
    method: 'POST',
    url: '/services',
    body: req,
  });
}

export async function linkServiceToFolder(req: LinkServiceToFolderRequest) {
  return request({
    method: 'POST',
    url: '/folderServices',
    body: req,
  });
}
