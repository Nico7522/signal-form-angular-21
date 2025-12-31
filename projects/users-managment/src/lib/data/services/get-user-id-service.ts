import { Injectable, InjectionToken, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserIdService {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #userId$: Observable<number> = this.#activatedRoute.params.pipe(
    map((params) => Number(params['id']))
  );

  getUserId(): Observable<number> {
    return this.#userId$;
  }
}
