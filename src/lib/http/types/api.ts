export type ApiResponse<T, D> = Promise<
  { success: true; data: T } | { success: false; error: D }
>;
