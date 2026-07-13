'use client';

import { SectionItem } from './section';
import { useBoardContext } from '@/contexts/board-context';
import { UnsectionedTasks } from './task/unsectioned-tasks';

function ProjectDetailsContent() {
  const { board } = useBoardContext();

  if (!board.tasks_without_sections.length && !board.sections.length) {
    return (
      <p className='text-muted-foreground text-sm font-medium'>
        You have no tasks or sections yet. Try creating one.
      </p>
    );
  }

  return (
    <section id='task-groups' className='space-y-10'>
      {board.tasks_without_sections.length > 0 && (
        <UnsectionedTasks tasks={board.tasks_without_sections} />
      )}

      {board.sections.map(section => (
        <SectionItem
          key={`${section.name}-${section.id}`}
          projectId={board.id}
          section={section}
        />
      ))}
    </section>
  );
}

export { ProjectDetailsContent };
