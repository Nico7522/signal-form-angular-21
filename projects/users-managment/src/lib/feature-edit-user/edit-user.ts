import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FakeUserService,
  GetUserIdService,
  USER_SERVICE,
  UserService,
  buildAddressValidator,
  buildUserValidator,
} from '../data';
import { form } from '@angular/forms/signals';
import { UserFormService } from '../data/services/user-form-service';
import { UserForm } from '../ui-common/user-form/user-form';

@Component({
  selector: 'app-edit-user',
  imports: [UserForm],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUser {
  readonly #userFormService = inject(UserFormService);
  readonly #userService = inject(UserService);
  readonly #editUserForm = this.#userFormService.editUserForm;
  protected readonly form = form(this.#editUserForm, (s) => {
    buildUserValidator(s);
    buildAddressValidator(s.address);
  });

  /**
   * This method is used to handle the form submission.
   * @param e - The event object.
   */
  saveOne(e: Event) {
    e.preventDefault();
    if (this.form().invalid()) {
      return;
    }
    this.#userService.update(this.form().value()).subscribe();
  }
}
