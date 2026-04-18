import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
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

      <main id='main-content' className='flex-1'>
        <MobileTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
