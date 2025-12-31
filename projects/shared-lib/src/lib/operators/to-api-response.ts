import { type Observable, of, pipe } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { type ApiResponse } from '../models/api-response';

/**
 * Configuration options for the toApiResponse operator.
 */
export interface ToApiResponseConfig {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

const defaultConfig: Required<ToApiResponseConfig> = {
  loadingMessage: 'Loading...',
  successMessage: 'Success',
  errorMessage: 'An error occurred',
};

/**
 * Custom RxJS operator that wraps an Observable's emissions in an ApiResponse object.
 * Handles loading, success, and error states automatically.
 *
 * @example
 * ```typescript
 * this.http.get<User[]>('/api/users').pipe(
 *   toApiResponse({
 *     loadingMessage: 'Loading users...',
 *     successMessage: 'Users loaded successfully',
 *   })
 * );
 * ```
 *
 * @param config - Optional configuration for custom messages
 * @returns An Observable of ApiResponse<T>
 */
export function toApiResponse<T>(config?: ToApiResponseConfig) {
  const { loadingMessage, successMessage, errorMessage } = {
    ...defaultConfig,
    ...config,
  };

  return pipe(
    map<T, ApiResponse<T>>((data) => ({
      data,
      message: successMessage,
      status: 'success',
    })),
    startWith<ApiResponse<T>>({
      data: null,
      message: loadingMessage,
      status: 'loading',
    }),
    catchError<ApiResponse<T>, Observable<ApiResponse<T>>>((error: unknown) =>
      of({
        data: null,
        message: error instanceof Error ? error.message : errorMessage,
        status: 'error',
      })
    )
  );
}
