import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FakeUserService, USER_SERVICE, UserService } from '../data';

@Component({
  selector: 'lib-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
  providers: [
    {
      provide: USER_SERVICE,
      useClass: FakeUserService,
    },
    UserService,
  ],
})
export class UserDetails {
  readonly #userService = inject(UserService);
  readonly user = this.#userService.user;
}
