'use client';

import { Spinner } from './spinner';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  IconAlertTriangleFilled,
  IconInfoHexagonFilled,
  IconRosetteDiscountCheckFilled,
  IconSquareRoundedXFilled,
} from '@tabler/icons-react';

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className='toaster group'
      position='bottom-right'
      visibleToasts={4}
      icons={{
        success: (
          <IconRosetteDiscountCheckFilled className='size-5 text-success' />
        ),
        info: <IconInfoHexagonFilled className='size-5 text-info' />,
        warning: <IconAlertTriangleFilled className='size-5 text-warning' />,
        error: <IconSquareRoundedXFilled className='size-5 text-error' />,
        loading: <Spinner />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
