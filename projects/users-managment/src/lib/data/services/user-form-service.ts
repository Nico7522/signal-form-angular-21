import { computed, inject, Injectable, linkedSignal } from '@angular/core';
import { UserService } from '..';

@Injectable()
export class UserFormService {
  readonly #userService = inject(UserService);
  readonly #user = this.#userService.user;

  /**
   * This is the computed that will return the user data or a default user data if the user is not found.
   */
  #editUserForm = computed(() => {
    let user = this.#user()?.data;
    if (!user) {
      user = {
        id: '',
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
      };
    }

    return user;
  });

  /**
   * This is the linked signal that will be used to return a writable signal that could be used to create the edit user form.
   */
  editUserForm = linkedSignal(this.#editUserForm);
}
