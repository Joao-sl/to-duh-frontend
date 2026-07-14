'use client';

import { BoardProvider } from '@/providers/board-provider';
import { ProjectBoardData } from '@/lib/http/types/project';
import { ProjectDetailsContent } from './content';
import { ProjectDetailsHeader } from './header/header';

function ProjectDetailsLayout({ project }: { project: ProjectBoardData }) {
  return (
    <BoardProvider initialData={project}>
      <ProjectDetailsHeader />
      <ProjectDetailsContent />
    </BoardProvider>
  );
}

export { ProjectDetailsLayout };
