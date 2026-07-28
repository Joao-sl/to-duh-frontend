export type ApiResponse<T, D> =
  | { success: true; data: T; status: number }
  | { success: false; error: D; status: number };
