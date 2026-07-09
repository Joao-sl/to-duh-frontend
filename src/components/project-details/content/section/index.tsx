'use client';

import { cn } from '@/utils/cn';
import { useState } from 'react';
import { TaskItem } from '../task';
import { Button } from '@/components/ui/button';
import { SectionDropdown } from './section-dropdown';
import { IconChevronRight } from '@tabler/icons-react';
import { useSectionActions } from './use-section-actions';
import { type SectionWithTask } from '@/lib/http/types/section';
import { UpdateSectionForm } from '@/components/section-form/update-section-form';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AddTaskButton } from '../task/add-task-button';

type SectionItemProps = {
  projectId: number;
  section: SectionWithTask;
};

function SectionItem({ projectId, section }: SectionItemProps) {
  const [sectionEditForm, setSectionEditForm] = useState(false);
  const { handleSectionUpdated, handleSectionArchived, handleSectionDeleted } =
    useSectionActions();

  return (
    <section>
      <Collapsible defaultOpen className='relative'>
        <header className='flex items-center gap-1 w-full'>
          <Tooltip>
            <CollapsibleTrigger
              asChild
              className='absolute -left-8.5 sm:-left-[6%] md:-left-[7%]'
            >
              <TooltipTrigger asChild>
                <Button
                  size='icon-sm'
                  variant='ghost'
                  aria-label='Collapse/expand tasks'
                  className={cn(
                    'data-open:[&_svg]:rotate-90 [&_svg]:transition hover:bg-transparent',
                    {
                      hidden: sectionEditForm,
                    },
                  )}
                >
                  <IconChevronRight />
                </Button>
              </TooltipTrigger>
            </CollapsibleTrigger>

            <TooltipContent className={cn({ hidden: sectionEditForm })}>
              <span>Collapse/expand tasks</span>
            </TooltipContent>
          </Tooltip>

          {sectionEditForm ? (
            <UpdateSectionForm
              submissionMode='route-handler'
              initialValues={section}
              onCancel={() => setSectionEditForm(false)}
              onSuccess={handleSectionUpdated}
            />
          ) : (
            <div className='flex grow justify-between group border-b border-border'>
              <h2
                onClick={() => setSectionEditForm(true)}
                title={section.name}
                className='flex items-center text-sm font-semibold'
              >
                <span className='line-clamp-1'>{section.name} 2</span>
              </h2>

              <SectionDropdown
                section={section}
                openEditForm={() => setSectionEditForm(true)}
                onArchive={() => handleSectionArchived(section.id)}
                onDelete={() => handleSectionDeleted(section.id)}
              />
            </div>
          )}
        </header>

        {!!section.tasks.length && (
          <CollapsibleContent>
            <ul>
              {section.tasks.map(task => (
                <TaskItem key={`${task.title}-${task.id}`} task={task} />
              ))}
            </ul>

            <div className='flex justify-center w-full py-4'>
              <AddTaskButton
                projectId={projectId}
                onSuccess={() => {}}
                defaultSection={section.id}
              />
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </section>
  );
}

export { SectionItem };
