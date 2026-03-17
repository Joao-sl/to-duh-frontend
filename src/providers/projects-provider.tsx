'use client';

import { useState } from 'react';
import { ProjectsContext } from '@/contexts/projects-context';
import { type GetProjectsResponse } from '@/lib/http/get-projects';

type ProjectsProviderProps = {
  children: React.ReactNode;
  projectsData: GetProjectsResponse;
};

export function ProjectsProvider({
  children,
  projectsData,
}: ProjectsProviderProps) {
  const [projects, setProjects] = useState<GetProjectsResponse>(projectsData);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}
