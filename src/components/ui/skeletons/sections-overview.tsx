import { Skeleton } from '../skeleton';
import { Container } from '../container';

function SectionsOverviewSkeleton() {
  return (
    <div aria-hidden className='h-full overflow-hidden'>
      <Container>
        <Skeleton className='w-40 h-5 mb-6' />
        <Skeleton className='w-full h-10 mb-6' />

        <div className='flex justify-between mb-6'>
          <div className='flex gap-2'>
            <Skeleton className='w-15 h-5' />
            <Skeleton className='w-15 h-5' />
          </div>
          <Skeleton className='w-40 h-5' />
        </div>

        <div className='space-y-4'>
          {Array.from({ length: 7 }).map((_, idx) => (
            <Skeleton key={idx} className='w-full h-19' />
          ))}
        </div>
      </Container>
    </div>
  );
}

export { SectionsOverviewSkeleton };
