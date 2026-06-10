import { NextRequest, NextResponse } from 'next/server';
import { type ZodType, flattenError } from 'zod';

export function withValidatedBody<T, P extends Record<string, string>>(
  schema: ZodType<T> | null,
  handler: (
    data: T | null,
    req: NextRequest,
    params: P,
  ) => Promise<NextResponse>,
) {
  return async (request: NextRequest, context: { params: Promise<P> }) => {
    const params = await context.params;
    let data: T | null = null;

    if (schema) {
      const body = await request.json().catch(() => null);

      if (body === null) {
        return NextResponse.json(
          { success: false, errors: 'Invalid JSON body' },
          { status: 400 },
        );
      }

      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { success: false, errors: flattenError(parsed.error).fieldErrors },
          { status: 400 },
        );
      }

      data = parsed.data;
    }

    try {
      return await handler(data, request, params);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Internal Server Error' },
        { status: 500 },
      );
    }
  };
}
