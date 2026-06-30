import { type TaskData } from '@/lib/http/types/task';
import { type ProjectBoardData } from '@/lib/http/types/project';

export function addTaskInBoard(
  state: ProjectBoardData,
  taskData: TaskData,
): ProjectBoardData {
  if (taskData.section_id == null) {
    return {
      ...state,
      tasks_without_sections: [...state.tasks_without_sections, taskData],
    };
  }

  return {
    ...state,
    sections: state.sections.map(section => {
      if (section.id !== taskData.section_id) {
        return section;
      }

      return {
        ...section,
        tasks: [...section.tasks, taskData],
      };
    }),
  };
}

export function updateTaskInBoard(
  state: ProjectBoardData,
  taskData: TaskData,
): ProjectBoardData {
  if (taskData.section_id == null) {
    return {
      ...state,
      tasks_without_sections: state.tasks_without_sections.map(task =>
        task.id === taskData.id ? taskData : task,
      ),
    };
  }

  return {
    ...state,
    sections: state.sections.map(section => {
      if (section.id !== taskData.section_id) {
        return section;
      }

      return {
        ...section,
        tasks: section.tasks.map(task =>
          task.id === taskData.id ? taskData : task,
        ),
      };
    }),
  };
}

export function removeTaskFromBoard(
  state: ProjectBoardData,
  taskData: Pick<TaskData, 'id' | 'section_id'>,
): ProjectBoardData {
  if (taskData.section_id == null) {
    return {
      ...state,
      tasks_without_sections: state.tasks_without_sections.filter(
        task => task.id !== taskData.id,
      ),
    };
  }

  return {
    ...state,
    sections: state.sections.map(section => {
      if (section.id !== taskData.section_id) {
        return section;
      }

      return {
        ...section,
        tasks: section.tasks.filter(task => task.id !== taskData.id),
      };
    }),
  };
}
