import { toast } from 'sonner';
import { TaskData } from '@/lib/http/types/task';
import { patchTask } from '@/lib/http/task/patch';
import { deleteTask } from '@/lib/http/task/delete';
import { useBoardContext } from '@/contexts/board-context';

function useTaskActions() {
  const { dispatch } = useBoardContext();

  function handleTaskCreated(data: TaskData) {
    dispatch({ type: 'TASK_CREATED', payload: data });
  }

  function handleTaskUpdated(data: TaskData) {
    dispatch({ type: 'TASK_UPDATED', payload: data });
  }

  async function handleTaskToggle(state: boolean, taskId: number) {
    const response = await patchTask(taskId, { is_completed: state });

    if (!response.success) {
      toast.error(
        `We can't complete your request due to an internal server error. HTTP CODE: ${response.status}`,
      );
      return false;
    }

    dispatch({ type: 'TASK_UPDATED', payload: response.data });
    return true;
  }

  async function handleTaskDelete(
    taskId: number,
    sectionId: number | null = null,
  ) {
    dispatch({
      type: 'TASK_DELETED',
      payload: { id: taskId, section_id: sectionId },
    });

    const response = await deleteTask(taskId);

    if (!response.success) {
      toast.error(
        `We can't complete your request due to an internal server error. HTTP CODE: ${response.status}`,
      );
    }
  }

  return {
    handleTaskCreated,
    handleTaskToggle,
    handleTaskDelete,
    handleTaskUpdated,
  };
}

export { useTaskActions };
