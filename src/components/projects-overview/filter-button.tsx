'use client';

import { cn } from '@/utils/cn';
import { useState } from 'react';
import { Button } from '../ui/button';
import { IconFilter2 } from '@tabler/icons-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export type FilterField = 'all' | 'favorites';

type FilterButtonProps = {
  selectedFilter: FilterField;
  onFilter: (field: FilterField) => void;
};

function FilterButton({ selectedFilter, onFilter }: FilterButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size='sm'
          variant='ghost'
          className='data-open:bg-accent capitalize'
        >
          <IconFilter2 stroke={2.5} /> {selectedFilter ?? 'Filters'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-fit p-1'>
        <p className='text-xs px-1 py-2 text-muted-foreground font-medium'>
          FILTER BY
        </p>

        <div className='flex flex-col gap-0.5'>
          <Button
            size='default'
            variant='ghost'
            onClick={() => (onFilter('all'), setOpen(false))}
            className={cn('justify-start', {
              'bg-accent/80': selectedFilter === 'all',
            })}
          >
            All
          </Button>

          <Button
            size='default'
            variant='ghost'
            onClick={() => (onFilter('favorites'), setOpen(false))}
            className={cn('justify-start', {
              'bg-accent/80': selectedFilter === 'favorites',
            })}
          >
            Favorites
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { FilterButton };
