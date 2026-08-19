'use client';

import { SortButton } from './sort-button';
import { Container } from '../ui/container';
import { SectionItem } from './section-item';
import { SearchHeader } from './search-header';
import type { SectionData } from '@/lib/http/types/section';
import { useSectionsOverview } from './use-sections-overview';

type SectionsOverviewProps = {
  initialData: SectionData[];
};

function SectionsOverview({ initialData }: SectionsOverviewProps) {
  const {
    sections,
    searchTerm,
    onSearchChange,
    clearSearch,
    searchInputRef,
    onSort,
    sortState,
    onSectionEdit,
    onSectionArchive,
    onSectionDelete,
  } = useSectionsOverview(initialData);

  return (
    <Container asChild>
      <section>
        <SearchHeader
          searchTerm={searchTerm}
          searchInputRef={searchInputRef}
          onSearchChange={onSearchChange}
          onClearSearch={clearSearch}
        />

        <div className='flex items-center justify-between'>
          <SortButton onSort={onSort} sort={sortState} />
          <p className='text-muted-foreground text-sm font-medium'>
            {sections.length} Total
          </p>
        </div>

        <ul>
          {sections.map(section => (
            <li key={section.id} className='group'>
              <SectionItem
                section={section}
                onEditSuccess={onSectionEdit}
                onArchive={() =>
                  onSectionArchive(section.id, { is_archived: true })
                }
                onDelete={() => onSectionDelete(section.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

export { SectionsOverview };
