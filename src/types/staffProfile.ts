import { Permission } from "$types/permission";

export type StaffProfile = {
  id: number;
  user: {
    name: string;
    phone: string;
    email: string;
  };
  is_active: boolean;
  role: number;
  permissions: Permission[];
};
