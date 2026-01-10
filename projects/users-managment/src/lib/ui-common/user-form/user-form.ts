import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { User } from '../../data';
import { AdressForm } from '../adress-form/adress-form';

@Component({
  selector: 'lib-user-form',
  imports: [Field, AdressForm],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  inputForm = input.required<FieldTree<Omit<User, 'id'>>>();
  title = input.required<string>();
  /**
   * This method is used to add a hobby to the edit user form.
   */
  addHobby() {
    this.inputForm()
      .hobbies()
      .value.update((state) => ({
        ...state,
        hobbies: [...state, { hobby: '' }],
      }));
  }

  /**
   * This method is used to remove a hobby from the edit user form.
   * @param index - The index of the hobby to remove.
   */
  removeHobby(index: number) {
    this.inputForm()
      .hobbies()
      .value.update((state) => ({
        ...state,
        hobbies: state.filter((_, i) => i !== index),
      }));
  }
}
