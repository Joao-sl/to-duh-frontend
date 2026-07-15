'use client';

import Link from 'next/link';
import { useUserContext } from '@/contexts/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

function AppSidebarHeader() {
  const { user } = useUserContext();
  const { open } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className='pb-1'>
          <SidebarMenuButton asChild className='hover:bg-transparent w-fit'>
            <Link href='/desk' className='font-bold tracking-tight'>
              {open ? 'TO~DUH' : 'TD'}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className='group-data-[collapsible=icon]:p-0! py-6 rounded-xl'
            asChild
            tooltip='Profile'
          >
            <Link
              href='/account'
              aria-label='Edit account details'
              className='space-x-0.5'
            >
              <Avatar
                aria-hidden
                className='group-data-[collapsible=icon]:size-8! size-10'
              >
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  <div aria-label='Placeholder to your avatar image'>
                    <span className='text-lg'>{user?.name[0] ?? 'T'}</span>
                  </div>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='line-clamp-1'>{user?.name ?? 'ERROR'}</p>
                <p className='line-clamp-1 text-muted-foreground text-xs'>
                  {user?.email ?? 'ERROR'}
                </p>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export { AppSidebarHeader };
