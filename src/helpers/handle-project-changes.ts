import { ProjectData } from '@/lib/http/get-projects';
import { ProjectBoardData } from '@/lib/http/types/project';

export function updateProjectInBoard(
  state: ProjectBoardData,
  data: ProjectData,
) {
  return {
    ...state,
    ...data,
  };
}
