import { type Address } from './address';
import { type Passwords } from '..';

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

export interface CreateUserForm {
  user: Omit<User, 'id'>;
  passwords: Passwords;
}

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
  passwords: {
    password: '',
    confirmPassword: '',
  },
};
