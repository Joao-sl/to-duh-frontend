import Loading from './loading';
import { Suspense } from 'react';
import { type Metadata } from 'next';
import { getTasksList } from '@/lib/http/task/get';
import { TasksOverview } from '@/components/tasks-overview';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function Tasks() {
  const tasks = await getTasksList();

  if (!tasks.success) {
    throw new Error('Tasks fetch error');
  }

  return (
    <Suspense fallback={<Loading />}>
      <TasksOverview initialData={tasks.data} />
    </Suspense>
  );
}
