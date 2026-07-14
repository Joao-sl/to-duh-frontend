'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Spinner } from './spinner';
import { cn } from '@/utils/cn';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { IconDeviceLaptop, IconMoon, IconSunHigh } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { flushSync } from 'react-dom';

type ThemeToggleButtonProps = {
  className?: string;
  tooltipDuration?: number;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
};

function ThemeToggleButton({
  className,
  tooltipDuration,
  tooltipSide,
}: ThemeToggleButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Spinner />;
  }

  function getClickOrigin(event: React.MouseEvent<HTMLElement>) {
    if (event.detail === 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }

    return { x: event.clientX, y: event.clientY };
  }

  function handleOnClick(theme: string, event: React.MouseEvent<HTMLElement>) {
    if (!document.startViewTransition) {
      setTheme(theme);
      setOpen(false);
      return;
    }

    const { x, y } = getClickOrigin(event);
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    document.documentElement.dataset.transition = 'theme';

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme);
        setOpen(false);
      });
    });
  }

  const btnClasses = 'w-full justify-start px-3! gap-2';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={tooltipDuration}>
        <TooltipTrigger asChild>
          <PopoverTrigger aria-label='Open theme menu'>
            <span className={className}>
              {theme === 'light' && <IconSunHigh aria-hidden />}
              {theme === 'dark' && <IconMoon aria-hidden />}
              {theme === 'system' && <IconDeviceLaptop aria-hidden />}
            </span>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent
          className={cn({ 'opacity-0': open })}
          side={tooltipSide}
        >
          <span>Toggle Theme</span>
        </TooltipContent>
      </Tooltip>

      <PopoverContent className='w-27 p-2'>
        <div className='flex flex-col gap-1'>
          <Button
            size='xs'
            variant='ghost'
            onClick={e => handleOnClick('light', e)}
            className={cn(btnClasses, {
              'bg-accent/70': theme === 'light',
            })}
          >
            <IconSunHigh aria-hidden />
            Light
          </Button>

          <Button
            size='xs'
            variant='ghost'
            onClick={e => handleOnClick('dark', e)}
            className={cn(btnClasses, {
              'bg-accent': theme === 'dark',
            })}
          >
            <IconMoon aria-hidden />
            Dark
          </Button>

          <Button
            size='xs'
            variant='ghost'
            onClick={e => handleOnClick('system', e)}
            className={cn(btnClasses, {
              'bg-accent/70': theme === 'system',
            })}
          >
            <IconDeviceLaptop aria-hidden />
            System
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ThemeToggleButton };
