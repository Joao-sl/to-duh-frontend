'use client';

import { SortButton } from './sort-button';
import { Container } from '../ui/container';
import { slugify } from '@/helpers/slugify';
import { ProjectItem } from './project-item';
import { FilterButton } from './filter-button';
import { SearchHeader } from './search-header';
import type { ProjectData } from '@/lib/http/types/project';
import { useProjectsOverview } from './use-project-overview';

type ProjectsOverviewProps = {
  initialData: ProjectData[];
};

function ProjectsOverview({ initialData }: ProjectsOverviewProps) {
  const {
    searchTerm,
    onSearchChange,
    searchInputRef,
    clearSearch,
    projects,
    onFilter,
    onSort,
    filterFieldState,
    sortState,
  } = useProjectsOverview(initialData);

  return (
    <Container asChild>
      <section>
        <SearchHeader
          searchTerm={searchTerm}
          onClearSearch={clearSearch}
          searchInputRef={searchInputRef}
          onSearchChange={onSearchChange}
        />

        <div className='flex items-center justify-between mb-2'>
          <div className='space-x-2'>
            <FilterButton
              selectedFilter={filterFieldState}
              onFilter={onFilter}
            />

            <SortButton sort={sortState} onSort={onSort} />
          </div>

          <p className='text-muted-foreground text-sm font-medium'>
            {projects.length} Total
          </p>
        </div>

        {projects.length > 1 ? (
          <ul className='flex flex-col'>
            {projects.map(project => (
              <ProjectItem
                key={project.id}
                project={project}
                href={`projects/${slugify(project.name)}-${project.id}`}
              />
            ))}
          </ul>
        ) : (
          <p className='text-muted-foreground text-sm font-medium mt-6'>
            Projects not founded
          </p>
        )}
      </section>
    </Container>
  );
}

export { ProjectsOverview };
