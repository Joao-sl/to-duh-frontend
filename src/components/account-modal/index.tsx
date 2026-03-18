'use client';

import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import { DeleteTab } from './tabs/delete';
import { OverviewTab } from './tabs/overview';
import { PasswordTab } from './tabs/password';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

function AccountModal() {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={open => {
        if (!open) {
          setTimeout(() => {
            router.back();
          }, 200);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>Manage your account</DialogDescription>
        </DialogHeader>

        <Separator />

        <Tabs defaultValue='overview'>
          <TabsList
            variant='line'
            className='mb-2 *:cursor-pointer *:aria-selected:cursor-default'
          >
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
            <TabsTrigger value='delete'>Delete</TabsTrigger>
          </TabsList>

          <OverviewTab />
          <PasswordTab />
          <DeleteTab />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export { AccountModal };
