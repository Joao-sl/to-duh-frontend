'use client';

import Link from 'next/link';
import { cn } from '@/utils/cn';
import { useUserContext } from '@/contexts/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { Button } from '@/components/ui/button';

function AppSidebarHeader() {
  const { user } = useUserContext();
  const { open, isMobile } = useSidebar();

  return (
    <SidebarHeader className='py-2'>
      <div className='relative flex justify-between overflow-hidden'>
        <h1
          className={cn(
            'absolute text-xs text-primary left-2 top-1/2 -translate-y-1/2 transition duration-300 ease-in-out whitespace-nowrap',
            {
              'opacity-0 -translate-y-4 pointer-events-none':
                !open && !isMobile,
              'opacity-100 translate-x-0': open && !isMobile,
            },
          )}
        >
          TO~DUH
        </h1>

        <Button
          variant='ghost'
          size='icon'
          asChild
          aria-label='Toggle theme'
          className={cn('size-8 ml-auto text-muted-foreground', {
            hidden: !open && !isMobile,
          })}
        >
          <ThemeToggleButton />
        </Button>

        <SidebarTrigger
          className={cn('text-muted-foreground', {
            'ml-auto': !open && !isMobile,
          })}
        />
      </div>

      <SidebarMenu>
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
