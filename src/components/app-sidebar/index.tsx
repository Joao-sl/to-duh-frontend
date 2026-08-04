import { AppSidebarHeader } from './layout/header';
import { AppSidebarFooter } from './layout/footer';
import { AppSidebarContent } from './layout/content';
import { getProjects } from '@/lib/http/get-projects';
import { Sidebar } from '../ui/sidebar';
import { ProjectsProvider } from '@/providers/projects-provider';
import { getCurrentUser } from '@/lib/http/get-current-user';
import { UserProvider } from '@/providers/user-provider';

async function AppSidebar({ account }: { account?: React.ReactNode }) {
  const projects = await getProjects();
  const user = await getCurrentUser();

  return (
    <UserProvider userData={user}>
      <Sidebar
        collapsible='icon'
        variant='inset'
        className='*:data-[slot=sidebar-inner]:rounded-2xl'
      >
        <AppSidebarHeader />

        <ProjectsProvider projectsData={projects}>
          <AppSidebarContent />
        </ProjectsProvider>

        <AppSidebarFooter />
      </Sidebar>
      {account}
    </UserProvider>
  );
}

export { AppSidebar };
