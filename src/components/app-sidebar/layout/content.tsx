import { cn } from '@/utils/cn';
import { MainButtons } from '../buttons/main-buttons';
import { ProjectsButton } from '../buttons/projects-button';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarSeparator,
} from '@/components/ui/sidebar';

async function AppSidebarContent() {
  return (
    <SidebarContent
      className={cn(
        '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:hover:w-2 [&::-webkit-scrollbar-track]:bg-background/50',
        '[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:hover:bg-primary/80 [&::-webkit-scrollbar-thumb]:rounded-full',
      )}
    >
      <SidebarGroup>
        <SidebarGroupLabel>
          <h3>Main</h3>
        </SidebarGroupLabel>

        <SidebarMenu>
          <MainButtons />
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarMenu>
          <ProjectsButton />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

export { AppSidebarContent };
