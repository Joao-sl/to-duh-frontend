'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Spinner } from './spinner';
import { IconBrightness } from '@tabler/icons-react';
import { Slot } from 'radix-ui';
import { cn } from '@/utils/cn';

type ThemeToggleButtonProps = {
  asChild?: boolean;
  className?: string;
};

function ThemeToggleButton({
  asChild = false,
  className,
}: ThemeToggleButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Spinner />;
  }

  const Comp = asChild ? Slot.Root : 'button';
  const isLight = theme === 'light';

  return (
    <Comp
      onClick={() => (isLight ? setTheme('dark') : setTheme('light'))}
      className={cn('cursor-pointer', className)}
    >
      <IconBrightness />
    </Comp>
  );
}

export { ThemeToggleButton };
