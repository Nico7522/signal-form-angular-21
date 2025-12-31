import { type Routes } from '@angular/router';
import { EditUser } from './feature-edit-user/edit-user';
import { CreateUser } from './feature-create-user/create-user';
import { ListUsers } from './feature-list-users';
import { UserDetails } from './feature-user-details';

export const usersRoutes: Routes = [
  {
    path: '',
    component: ListUsers,
  },
  {
    path: 'create',
    component: CreateUser,
  },
  {
    path: ':id',
    component: UserDetails,
  },
  {
    path: ':id/edit',
    component: EditUser,
  },
];
