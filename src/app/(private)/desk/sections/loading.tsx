import { SectionsOverviewSkeleton } from '@/components/ui/skeletons/sections-overview';

export default function Loading() {
  return (
    <div aria-busy>
      <p className='sr-only' role='status' aria-live='polite'>
        Loading the tasks overview page...
      </p>

      <SectionsOverviewSkeleton />
    </div>
  );
}
