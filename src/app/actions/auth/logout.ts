'use server';

import { closeSession } from '@/helpers/auth-token-manager';
import { redirect } from 'next/navigation';

export async function logOutAction(redirectTo: string = '/') {
  await closeSession();
  redirect(redirectTo);
}
