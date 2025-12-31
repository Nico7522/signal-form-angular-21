import { Component, signal } from '@angular/core';
import { createUserFormSchema, type CreateUserForm } from '../data';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-create-user',
  imports: [Field],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  readonly #user = signal<CreateUserForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    address: '',
    phone: '',
    role: '',
    hobbies: [{ hobby: '' }],
  });

  protected readonly userForm = form(this.#user, createUserFormSchema);

  /**
   * This method is used to handle the form submission.
   * @param e - The event object.
   */
  saveOne(e: Event) {
    e.preventDefault();

    console.log(this.userForm().value());
  }

  /**
   * This method is used to add a hobby to the create user form.
   */
  addHobby() {
    this.userForm.hobbies().value.update((state) => [...state, { hobby: '' }]);
  }

  /**
   * This method is used to remove a hobby from the create user form.
   * @param index - The index of the hobby to remove.
   */
  removeHobby(index: number) {
    this.userForm.hobbies().value.update((state) => state.filter((_, i) => i !== index));
  }
}
