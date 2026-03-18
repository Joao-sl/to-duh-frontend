import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebarSkeleton } from '@/components/ui/skeletons/app-sidebar-skeleton';

type AppLayoutProps = {
  children: React.ReactNode;
  account: React.ReactNode;
};

export default function AppLayout({ children, account }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Suspense fallback={<AppSidebarSkeleton />}>
        <AppSidebar account={account} />
        <SidebarTrigger className='mt-2 rounded-full border size-7' />
      </Suspense>

      <main className='container mx-auto px-40 py-18'>{children}</main>
    </SidebarProvider>
  );
}
