'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { SectionData } from '@/lib/http/types/section';
import { UpdateSectionForm } from '../section-form/update-section-form';
import { SectionDropdown } from '../project-details/content/section/section-dropdown';

type SectionItemProps = {
  section: SectionData;
  onEditSuccess: (data: SectionData) => void;
  onArchive: () => void;
  onDelete: () => void;
};

function SectionItem({
  section,
  onEditSuccess,
  onArchive,
  onDelete,
}: SectionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative py-4.5 px-4 hover:bg-accent/20 rounded-2xl overflow-hidden'>
      {open ? (
        <div className='mb-2'>
          <UpdateSectionForm
            submissionMode='route-handler'
            initialValues={{ id: section.id, name: section.name }}
            onSuccess={data => {
              onEditSuccess(data);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </div>
      ) : (
        <>
          <div className='flex-1'>
            <h2
              title={section.name}
              className='text-[15px] font-semibold line-clamp-1'
            >
              {section.name}
            </h2>
          </div>

          <div className='grid grid-cols-2 items-center justify-between text-muted-foreground text-[12.5px] mt-2'>
            <time dateTime={section.created_at}>
              Created at {format(section.created_at, 'dd MMMM yyyy')}
            </time>

            <time dateTime={section.updated_at}>
              Updated at {format(section.updated_at, 'dd MMMM yyyy')}
            </time>
          </div>

          <div className='absolute right-0 bottom-3'>
            <SectionDropdown
              onArchive={onArchive}
              onDelete={onDelete}
              openEditForm={() => setOpen(true)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export { SectionItem };
