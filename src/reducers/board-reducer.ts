import { type BoardAction } from './types/board';
import { type ProjectBoardData } from '@/lib/http/types/project';
import { updateProjectInBoard } from '@/helpers/handle-project-changes';
import { updateSectionInBoard } from '@/helpers/handle-section-changes';
import {
  removeTaskFromBoard,
  updateTaskInBoard,
} from '@/helpers/handle-task-changes';

export function boardReducer(
  state: ProjectBoardData,
  action: BoardAction,
): ProjectBoardData {
  switch (action.type) {
    case 'PROJECT_UPDATED':
      return updateProjectInBoard(state, action.payload);

    case 'SECTION_UPDATED':
      return updateSectionInBoard(state, action.payload);

    case 'TASK_UPDATED':
      return updateTaskInBoard(state, action.payload);

    case 'TASK_DELETED':
      return removeTaskFromBoard(state, action.payload);

    case 'TASK_ARCHIVED':
      return removeTaskFromBoard(state, action.payload);

    default:
      return state;
  }
}
