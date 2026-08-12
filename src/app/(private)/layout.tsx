import { cn } from '@/utils/cn';
import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebarSkeleton } from '@/components/ui/skeletons/app-sidebar-skeleton';
import { MobileTrigger } from '@/components/app-sidebar/layout/mobile-trigger';
import { SidebarAutoClose } from '@/components/app-sidebar/utils/auto-close';

type AppLayoutProps = {
  children: React.ReactNode;
  account: React.ReactNode;
};

export default function AppLayout({ children, account }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Suspense fallback={<AppSidebarSkeleton />}>
        <SidebarAutoClose />
        <AppSidebar account={account} />
      </Suspense>

      <SidebarInset
        className={cn(
          'h-svh md:h-[calc(100svh-1rem)] md:peer-data-[variant=inset]:rounded-2xl sm:p-2 overflow-hidden',
        )}
      >
        <div
          id='main-content'
          className={cn(
            'flex-1 min-h-0 overflow-auto',
            'scrollbar-thin scrollbar-gutter-stable scrollbar-thumb-primary',
          )}
        >
          <MobileTrigger />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
