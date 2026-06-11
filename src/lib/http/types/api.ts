export type ApiResponse<T, D> = Promise<
  | { success: true; data: T; status: number }
  | { success: false; error: D; status: number }
>;
