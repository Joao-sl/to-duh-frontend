'use client';

import { cn } from '@/utils/cn';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

type MobileTriggerProps = {
  className?: string;
};

function MobileTrigger({ className }: MobileTriggerProps) {
  const { isMobile } = useSidebar();

  return (
    isMobile && (
      <Suspense fallback={<Spinner />}>
        <SidebarTrigger className={cn('w-full', className)} />
      </Suspense>
    )
  );
}

export { MobileTrigger };
