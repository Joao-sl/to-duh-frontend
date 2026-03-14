import { Skeleton } from '../skeleton';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
} from '../sidebar';

function AppSidebarSkeleton() {
  return (
    <Sidebar
      variant='floating'
      className='*:data-[slot=sidebar-inner]:rounded-3xl'
    >
      <SidebarHeader>
        <SidebarMenu className='py-2'>
          <SidebarMenuItem>
            <div className='flex items-center gap-2'>
              <Skeleton className='size-10 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-3 w-32' />
                <Skeleton className='h-3 w-20' />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {Array.from({ length: 3 }).map((_, idx) => (
            <SidebarMenuSkeleton showIcon key={idx} />
          ))}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuSkeleton showIcon />
          <SidebarMenuSub>
            {Array.from({ length: 10 }).map((_, idx) => (
              <SidebarMenuSkeleton key={idx} />
            ))}
          </SidebarMenuSub>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebarSkeleton };
