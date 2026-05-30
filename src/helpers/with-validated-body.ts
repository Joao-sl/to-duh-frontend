import z, { type ZodType } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

export function withValidatedBody<T>(
  schema: ZodType<T> | null,
  handler: (data: T | null, req: NextRequest) => Promise<NextResponse>,
) {
  return async (request: NextRequest) => {
    let data: T | null = null;

    if (schema) {
      const body = await request.json();
      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { success: false, errors: z.flattenError(parsed.error).fieldErrors },
          { status: 400 },
        );
      }

      data = parsed.data;
    }

    try {
      return await handler(data, request);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Internal Server Error' },
        { status: 500 },
      );
    }
  };
}
