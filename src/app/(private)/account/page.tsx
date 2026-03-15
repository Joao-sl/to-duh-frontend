import { redirect } from 'next/navigation';
import { APP_ROOT_PATH } from '@/constants';

export default function Account() {
  redirect(`${APP_ROOT_PATH}`);
}
