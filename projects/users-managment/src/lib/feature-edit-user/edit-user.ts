import { Component, inject } from '@angular/core';
import {
  FakeUserService,
  GetUserIdService,
  USER_SERVICE,
  UserService,
  editUserSchema,
} from '../data';
import { Field, form } from '@angular/forms/signals';
import { UserFormService } from '../data/services/user-form-service';

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
    GetUserIdService,
    UserFormService,
    UserService,
  ],
})
export class EditUser {
  readonly #userFormService = inject(UserFormService);
  readonly #userService = inject(UserService);
  readonly #editUserForm = this.#userFormService.editUserForm;
  protected readonly form = form(this.#editUserForm, editUserSchema);

  /**
   * This method is used to handle the form submission.
   * @param e - The event object.
   */
  saveOne(e: Event) {
    e.preventDefault();
    if (this.form().invalid()) {
      return;
    }

    console.log(this.form().value());
    this.#userService.update(this.form().value()).subscribe((response) => {
      console.log(response);
    });
  }

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
