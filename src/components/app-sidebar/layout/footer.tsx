'use client';

import { Button } from '@/components/ui/button';
import { IconLogout } from '@tabler/icons-react';
import { logOutAction } from '@/app/actions/auth/logout';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/utils/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function AppSidebarFooter() {
  const { open } = useSidebar();

  return (
    <SidebarFooter>
      <SidebarMenu className={cn('items-center', { 'flex-row': open })}>
        <SidebarMenuItem>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <SidebarMenuButton className='[&_svg]:size-4' asChild>
                <SidebarTrigger />
              </SidebarMenuButton>
            </TooltipTrigger>

            <TooltipContent side={open ? 'top' : 'right'}>
              {open ? 'Close sidebar' : 'Open sidebar'}
            </TooltipContent>
          </Tooltip>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <ThemeToggleButton
              className='[&_svg]:size-4'
              tooltipDuration={0}
              tooltipSide={open ? 'top' : 'right'}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <Dialog>
            <Tooltip delayDuration={0}>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <SidebarMenuButton aria-label='Log out'>
                    <IconLogout aria-hidden />
                  </SidebarMenuButton>
                </TooltipTrigger>
              </DialogTrigger>

              <TooltipContent side={open ? 'top' : 'right'}>
                <span>Log out</span>
              </TooltipContent>
            </Tooltip>

            <DialogContent size='sm' showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Stay with us!</DialogTitle>
                <DialogDescription>
                  Are you sure you want to log out?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button size='sm' variant='outline'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  size='sm'
                  variant='destructive'
                  onClick={async () => await logOutAction()}
                >
                  Log out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export { AppSidebarFooter };
