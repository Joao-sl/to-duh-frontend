'use client';

import Link from 'next/link';
import { APP_ROOT_PATH } from '@/constants';
import { slugify } from '@/helpers/slugify';
import { usePathname } from 'next/navigation';
import { useProjectsContext } from '@/contexts/projects-context';
import { IconAt, IconChevronDown, IconFolders } from '@tabler/icons-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ProjectsButton() {
  const pathname = usePathname();
  const basePath = `${APP_ROOT_PATH}/projects`;
  const { projects } = useProjectsContext();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={'Projects'}
        asChild
        isActive={pathname.startsWith(basePath)}
      >
        <Link href={basePath}>
          <IconFolders strokeWidth={1} /> Projects
        </Link>
      </SidebarMenuButton>

      <Collapsible defaultOpen>
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <CollapsibleTrigger
              asChild
              className='aria-expanded:[&_svg]:rotate-180 [&_svg]:transition hover:bg-black/10 dark:hover:bg-white/10'
            >
              <SidebarMenuAction>
                <IconChevronDown />
              </SidebarMenuAction>
            </CollapsibleTrigger>
          </TooltipTrigger>

          <TooltipContent>
            <span>Expand/Collapse</span>
          </TooltipContent>
        </Tooltip>

        <CollapsibleContent>
          <SidebarMenuSub>
            {!projects.success ? (
              <div role='alert'>
                <p className='text-sm text-destructive'>
                  Sorry, we receive an error trying to get your projects.
                </p>
                <p className='text-sm text-destructive'>
                  ERROR: {projects.error}
                </p>
              </div>
            ) : (
              projects.data.map((project, index) => (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={
                      pathname ===
                      `${basePath}/${slugify(project.name)}-${project.id}`
                    }
                  >
                    <Link
                      href={`${basePath}/${slugify(project.name)}-${project.id}`}
                    >
                      <IconAt
                        strokeWidth={1}
                        className='text-muted-foreground!'
                      />
                      <span className='line-clamp-1' title={project.name}>
                        {project.name}
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
