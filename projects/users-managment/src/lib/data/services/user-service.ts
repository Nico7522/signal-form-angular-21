import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CreateUserForm, GetUserIdService, User, USER_SERVICE } from '..';
import { toApiResponse } from 'shared-lib';

@Injectable()
export class UserService {
  readonly #getUserIdService = inject(GetUserIdService);
  readonly #userRepository = inject(USER_SERVICE);
  /**
   * This is the observable that will be used to get the user. Each time the user id changes, the observable will be called again.
   */
  readonly #user$ = this.#getUserIdService.getUserId().pipe(
    switchMap((id) =>
      this.#userRepository.getOne(id.toString()).pipe(
        toApiResponse({
          loadingMessage: 'Loading user...',
          successMessage: 'User fetched successfully',
        })
      )
    )
  );

  /**
   * This is the signal that will be used to get the user. It will be updated each time the user id changes.
   */
  user = toSignal(this.#user$, { initialValue: null });

  /**
   * This is the signal that will be used to get the user list. It will be updated each time the user list changes.
   */
  userList = toSignal(this.#getAll(), {
    initialValue: { data: null, message: '', status: 'loading' },
  });

  #getAll() {
    return this.#userRepository.getAll().pipe(
      toApiResponse({
        loadingMessage: 'Loading users...',
        successMessage: 'Users fetched successfully',
      })
    );
  }

  create(user: CreateUserForm) {
    return this.#userRepository.create(user).pipe(
      toApiResponse({
        loadingMessage: 'Creating user...',
        successMessage: 'User created successfully',
      })
    );
  }

  update(user: Partial<User>) {
    return this.#userRepository.update(this.user()?.data?.id ?? '', user).pipe(
      toApiResponse({
        loadingMessage: 'Updating user...',
        successMessage: 'User updated successfully',
      })
    );
  }
}
