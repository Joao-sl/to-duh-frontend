import { type GetProjectsResponse } from '@/lib/http/get-projects';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type ProjectContextValue = {
  projects: GetProjectsResponse;
  setProjects: Dispatch<SetStateAction<GetProjectsResponse>>;
};

export const ProjectsContext = createContext<ProjectContextValue>({
  projects: { success: false, error: 'Provider is required' },
  setProjects: () => {},
});

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjectsContext must be use within ProjectsProvider');
  }

  return context;
};
