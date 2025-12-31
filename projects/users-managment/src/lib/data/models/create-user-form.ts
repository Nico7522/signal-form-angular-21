import { type User } from '..';

export type CreateUserForm = Omit<User, 'id'> & {
  password: string;
  confirmPassword: string;
};
