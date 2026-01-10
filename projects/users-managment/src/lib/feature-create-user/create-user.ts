import { Component, inject, signal } from '@angular/core';
import {
  createUserFormSchema,
  FakeUserService,
  GetUserIdService,
  initCreateUserForm,
  USER_SERVICE,
  UserService,
  type CreateUserForm,
} from '../data';
import { form } from '@angular/forms/signals';
import { UserForm } from '../ui-common/user-form/user-form';
import { PasswordForm } from '../ui-common/password-form/password-form';

@Component({
  selector: 'app-create-user',
  imports: [UserForm, PasswordForm],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
  providers: [
    {
      provide: USER_SERVICE,
      useClass: FakeUserService,
    },
    GetUserIdService,
    UserService,
  ],
})
export class CreateUser {
  readonly #userService = inject(UserService);
  readonly #user = signal<CreateUserForm>(initCreateUserForm);
  protected readonly userForm = form(this.#user, createUserFormSchema);

  /**
   * This method is used to handle the form submission.
   * @param e - The event object.
   */
  saveOne(e: Event) {
    e.preventDefault();
    if (this.userForm().invalid()) {
      return;
    }
    this.#userService.create(this.userForm().value()).subscribe();
  }
}
