'use client';

import Link from 'next/link';
import { APP_ROOT_PATH } from '@/constants';
import { usePathname } from 'next/navigation';
import { CreateProjectModal } from '@/components/create-project-modal';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
  IconChecks,
  IconArchive,
  IconFolderPlus,
  IconLayersSelectedBottom,
} from '@tabler/icons-react';

export function MainButtons() {
  const pathname = usePathname();

  const mainButtons = [
    {
      icon: <IconChecks />,
      href: `${APP_ROOT_PATH}/tasks`,
      label: 'Tasks',
    },
    {
      icon: <IconLayersSelectedBottom />,
      href: `${APP_ROOT_PATH}/sections`,
      label: 'Sections',
    },
    {
      icon: <IconArchive />,
      href: `${APP_ROOT_PATH}/archive`,
      label: 'Archive',
    },
  ];

  return (
    <>
      <SidebarMenuItem>
        <CreateProjectModal>
          <SidebarMenuButton>
            <IconFolderPlus className='text-muted-foreground' /> Add project
          </SidebarMenuButton>
        </CreateProjectModal>
      </SidebarMenuItem>

      {mainButtons.map((item, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton asChild isActive={pathname === item.href}>
            <Link href={item.href} className='[&_svg]:text-muted-foreground'>
              {item.icon} {item.label}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
