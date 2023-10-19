export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; // should be a role type
  type: string; // should be a user type
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  user: User | null;
  token: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: User | null;
  token: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  role: string; // should be a role type
  type: string; // should be a user type
};
