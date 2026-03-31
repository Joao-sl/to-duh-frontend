'use client';

import { Button } from '@/components/ui/button';
import { useId, useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { IconCalendar, IconX } from '@tabler/icons-react';
import { format, parseISO, isValid, addYears } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  triggerId?: string;
  value?: string;
  onValueChange: (value?: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

function DatePicker({
  value,
  disabled,
  triggerId,
  placeholder = 'Date',
  onValueChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const genId = useId();
  const today = new Date();

  const selectedDate = useMemo(() => {
    if (!value) return undefined;
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex items-center gap-1'>
        <PopoverTrigger
          id={triggerId ?? genId}
          name={triggerId ?? genId}
          asChild
        >
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            className='hover:bg-transparent dark:hover:bg-input/50 font-normal'
          >
            <IconCalendar className='text-muted-foreground' />
            {selectedDate ? (
              format(selectedDate, 'MMMM d, yy')
            ) : (
              <span className='text-muted-foreground'>{placeholder} </span>
            )}
          </Button>
        </PopoverTrigger>

        {selectedDate && (
          <Button
            size='icon-xs'
            variant='ghost'
            onClick={() => onValueChange(undefined)}
            aria-label='Clear date'
            className='rounded-sm p-0.5 hover:bg-muted-foreground/25'
          >
            <IconX />
          </Button>
        )}
      </div>

      <PopoverContent
        align='end'
        side='bottom'
        sideOffset={8}
        collisionPadding={12}
        className='p-2 w-auto'
      >
        <Calendar
          mode='single'
          selected={selectedDate}
          defaultMonth={selectedDate ?? new Date()}
          onSelect={date => {
            onValueChange(date ? date.toISOString() : undefined);
            setOpen(false);
          }}
          fixedWeeks
          disabled={{ before: today }}
          startMonth={today}
          endMonth={addYears(today, 20)}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
