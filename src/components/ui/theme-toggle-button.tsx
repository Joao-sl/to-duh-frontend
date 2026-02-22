'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return 'loading';
  }

  const isLight = theme === 'light';

  return (
    <button onClick={() => (isLight ? setTheme('dark') : setTheme('light'))}>
      {isLight ? 'dark' : 'light'}
    </button>
  );
}

export { ThemeToggleButton };
