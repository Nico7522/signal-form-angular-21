import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FakeUserService, GetUserIdService, USER_SERVICE, UserService } from '../data';

@Component({
  selector: 'lib-list-users',
  imports: [RouterLink],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
  providers: [
    {
      provide: USER_SERVICE,
      useClass: FakeUserService,
    },
    GetUserIdService,
    UserService,
  ],
})
export class ListUsers {
  readonly #userService = inject(UserService);

  readonly userList = this.#userService.userList;
}
