'use client';

import { cn } from '@/utils/cn';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { IconArrowsSort } from '@tabler/icons-react';
import type { SortState } from './use-project-overview';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export type SortField = 'created' | 'updated' | 'favorites';
export type SortDirection = 'asc' | 'desc';

type SortButtonProps = {
  onSort: (field: SortField, direction: SortDirection) => void;
  sort: SortState;
};

function SortButton({ sort, onSort }: SortButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size='sm'
          variant='ghost'
          className='data-open:bg-accent capitalize'
        >
          <IconArrowsSort /> {sort?.field ?? 'Sort'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-fit p-1'>
        <p className='text-xs px-1 py-2 text-muted-foreground font-medium'>
          SORT BY
        </p>

        <div className='space-y-2'>
          <div className='flex flex-col gap-0.5'>
            <Button
              size='default'
              variant='ghost'
              onClick={() => (
                onSort('created', sort.direction),
                setOpen(false)
              )}
              className={cn('justify-start', {
                'bg-accent/80': sort.field === 'created',
              })}
            >
              Created
            </Button>

            <Button
              size='default'
              variant='ghost'
              onClick={() => (
                onSort('updated', sort.direction),
                setOpen(false)
              )}
              className={cn('justify-start', {
                'bg-accent/80': sort.field === 'updated',
              })}
            >
              Updated
            </Button>

            <Button
              size='default'
              variant='ghost'
              onClick={() => (
                onSort('favorites', sort.direction),
                setOpen(false)
              )}
              className={cn('justify-start', {
                'bg-accent/80': sort.field === 'favorites',
              })}
            >
              Favorites
            </Button>
          </div>

          <Separator decorative />

          <div className='flex flex-col gap-0.5'>
            <Button
              size='default'
              variant='ghost'
              className={cn('justify-start', {
                'bg-accent/80': sort.direction === 'asc',
              })}
              onClick={() => {
                onSort(sort.field, 'asc');
              }}
            >
              Ascending
            </Button>

            <Button
              size='default'
              variant='ghost'
              className={cn('justify-start', {
                'bg-accent/80': sort.direction === 'desc',
              })}
              onClick={() => {
                onSort(sort.field, 'desc');
              }}
            >
              Descending
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { SortButton };
