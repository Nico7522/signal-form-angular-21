import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, type FieldTree } from '@angular/forms/signals';
import { type User } from '../../data';
import { AdressForm } from '../adress-form/adress-form';

@Component({
  selector: 'lib-user-form',
  imports: [Field, AdressForm],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  inputForm = input.required<FieldTree<Omit<User, 'id'>>>();
  title = input.required<string>();
  /**
   * This method is used to add a hobby to the edit user form.
   */
  addHobby() {
    const hobbies = this.inputForm().hobbies();
    hobbies.value.update((state) => [...state, { hobby: '' }]);
  }

  /**
   * This method is used to remove a hobby from the edit user form.
   * @param index - The index of the hobby to remove.
   */
  removeHobby(index: number) {
    this.inputForm()
      .hobbies()
      .value.update((state) => state.filter((_, i) => i !== index));
  }
}
