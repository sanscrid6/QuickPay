import {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  UserResponse,
  TreeResponse,
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
