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

export type ServiceNode = {
  body: string;
  description: string;
  id: string;
  title: string;
  userId: string;
};

export type FolderNode = {
  folders?: FolderNode[];
  id: string;
  title: string;
  services: ServiceNode[];
};

export type TreeResponse = FolderNode[];
