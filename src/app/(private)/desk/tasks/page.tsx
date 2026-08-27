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

  return <TasksOverview initialData={tasks.data} />;
}
