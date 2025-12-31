import { computed, inject, Injectable, linkedSignal } from '@angular/core';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetUserIdService, USER_SERVICE } from '..';
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

  /**
   * This is the computed that will return the user data or a default user data if the user is not found.
   */
  #editUserForm = computed(() => {
    let user = this.user()?.data;
    if (!user) {
      user = {
        id: '',
        name: '',
        email: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        address: '',
        phone: '',
        role: '',
        hobbies: [{ hobby: '' }],
      };
    }

    return user;
  });

  /**
   * This is the linked signal that will be used to return a writable signal that could be used to create the edit user form.
   */
  editUserForm = linkedSignal(this.#editUserForm);

  #getAll() {
    return this.#userRepository.getAll().pipe(
      toApiResponse({
        loadingMessage: 'Loading users...',
        successMessage: 'Users fetched successfully',
      })
    );
  }
}
