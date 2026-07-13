import { ProjectDetailsSkeleton } from '@/components/ui/skeletons/project-details';

export default function Loading() {
  return (
    <div aria-busy>
      <p className='sr-only' role='status' aria-live='polite'>
        Loading the page...
      </p>

      <ProjectDetailsSkeleton />
    </div>
  );
}
