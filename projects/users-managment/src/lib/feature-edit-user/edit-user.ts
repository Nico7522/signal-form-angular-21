import { Component, inject } from '@angular/core';
import { FakeUserService, USER_SERVICE, UserService, editUserSchema } from '../data';
import { Field, form } from '@angular/forms/signals';

@Component({
  selector: 'app-edit-user',
  imports: [Field],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
  providers: [
    {
      provide: USER_SERVICE,
      useClass: FakeUserService,
    },

    UserService,
  ],
})
export class EditUser {
  readonly #userService = inject(UserService);

  readonly #editUserForm = this.#userService.editUserForm;
  protected readonly form = form(this.#editUserForm, editUserSchema);

  /**
   * This method is used to handle the form submission.
   * @param e - The event object.
   */
  saveOne(e: Event) {}

  /**
   * This method is used to add a hobby to the edit user form.
   */
  addHobby() {
    this.#editUserForm.update((state) => ({
      ...state,
      hobbies: [...state.hobbies, { hobby: '' }],
    }));
  }

  /**
   * This method is used to remove a hobby from the edit user form.
   * @param index - The index of the hobby to remove.
   */
  removeHobby(index: number) {
    this.#editUserForm.update((state) => ({
      ...state,
      hobbies: state.hobbies.filter((_, i) => i !== index),
    }));
  }
}
