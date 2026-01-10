import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, type Observable } from 'rxjs';

@Injectable()
export class GetUserIdService {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #userId$: Observable<string> = this.#activatedRoute.params.pipe(
    map((params) => params['id'])
  );

  getUserId(): Observable<string> {
    return this.#userId$;
  }
}
