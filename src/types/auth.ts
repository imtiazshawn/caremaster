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

export enum LoginResponseStatus {
  success = "success",
  error = "error",
}

export type LoginResponse = {
  status: LoginResponseStatus;
  response: string;
};

export enum UserType {
  staff = "staff",
  care_worker = "care_worker",
}

export type LoginCredentials = {
  email: string;
  password: string;
  user_type: UserType;
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
