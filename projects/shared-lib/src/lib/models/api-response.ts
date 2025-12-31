export type Status = 'success' | 'error' | 'loading';

export interface ApiResponse<T> {
  data: T | null;
  message: string;
  status: Status;
}
