import { Address } from './address';

export interface User {
  id: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  role: string;
  hobbies: { hobby: string }[];
}

export type UserList = User[];

export type CreateUserForm = {
  user: Omit<User, 'id'>;
  password: string;
  confirmPassword: string;
};

export const initCreateUserForm: CreateUserForm = {
  user: {
    name: '',
    email: '',
    address: {
      city: '',
      state: '',
      country: '',
      zip: '',
    },
    phone: '',
    role: '',
    hobbies: [{ hobby: '' }],
  },
  password: '',
  confirmPassword: '',
};
