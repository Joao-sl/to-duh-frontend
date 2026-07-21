import type { ProjectBoardData, ProjectData } from '@/lib/http/types/project';

export function updateProjectInBoard(
  state: ProjectBoardData,
  data: ProjectData,
) {
  return {
    ...state,
    ...data,
  };
}
