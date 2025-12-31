import { inject, Injectable, InjectionToken } from '@angular/core';
import { type CreateUserForm, type User, type UserList } from '../../data';
import { delay, type Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface UserRepository {
  getAll: () => Observable<UserList>;
  getOne: (id: string) => Observable<User>;
  create: (user: CreateUserForm) => Observable<void>;
  update: (id: string, user: Partial<User>) => Observable<void>;
}

/**
 * Injection token for the user service
 */
export const USER_SERVICE = new InjectionToken<UserRepository>('USER_SERVICE');

/**
 * This class is used to mock the user service and interact with fake data
 */
@Injectable()
export class FakeUserService implements UserRepository {
  getAll(): Observable<UserList> {
    return of([
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
        address: '123 Main St',
        phone: '1234567890',
        role: 'admin',
        hobbies: [{ hobby: 'reading' }],
      },
    ]).pipe(delay(1000));
  }

  getOne(id: string): Observable<User> {
    return of({
      id: id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zip: '10001',
      address: '123 Main St',
      phone: '1234567890',
      role: 'admin',
      hobbies: [{ hobby: 'reading' }],
    }).pipe(delay(1000));
  }

  create(user: CreateUserForm): Observable<void> {
    return of(undefined).pipe(delay(1000));
  }

  update(id: string, user: Partial<User>): Observable<void> {
    return of(undefined).pipe(delay(1000));
  }
}
