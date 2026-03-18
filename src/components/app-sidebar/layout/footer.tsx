'use client';

import { Button } from '@/components/ui/button';
import { IconArrowBarRight } from '@tabler/icons-react';
import { logOutAction } from '@/app/actions/auth/logout';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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

function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton>
                <IconArrowBarRight /> Log out
              </SidebarMenuButton>
            </DialogTrigger>

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
