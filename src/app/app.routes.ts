import { type Routes } from '@angular/router';
import { usersRoutes } from 'users-managment';
export const routes: Routes = [
  {
    path: 'users',
    children: usersRoutes,
  },
];
