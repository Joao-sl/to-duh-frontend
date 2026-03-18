import { AppSidebarHeader } from './layout/header';
import { AppSidebarFooter } from './layout/footer';
import { AppSidebarContent } from './layout/content';
import { getProjects } from '@/lib/http/get-projects';
import { Sidebar, SidebarSeparator } from '../ui/sidebar';
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
        variant='floating'
        className='*:data-[slot=sidebar-inner]:rounded-3xl'
      >
        <AppSidebarHeader />
        <SidebarSeparator />

        <ProjectsProvider projectsData={projects}>
          <AppSidebarContent />
        </ProjectsProvider>

        <SidebarSeparator />
        <AppSidebarFooter />
      </Sidebar>

      {account}
    </UserProvider>
  );
}

export { AppSidebar };
