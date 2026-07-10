import { cn } from '@/utils/cn';
import { Skeleton } from '../skeleton';
import { Container } from '../container';

function ProjectDetailsSkeleton() {
  const widths = {
    breadcrumbs: ['35%', '30%', '30%', '50%'],
    header: ['50%', '70%'],
    taskTitle: ['35%', '75%', '70%', '50%', '30%'],
    taskDesc: ['70%', '40%', '55%', '65%', '25%'],
  };

  return (
    <div aria-hidden className='max-h-screen overflow-hidden'>
      <div className='flex gap-2 p-4 md:max-w-4/12'>
        {widths.breadcrumbs.map((width, idx) => (
          <Skeleton
            className='h-3.5'
            key={`${idx}-breadcrumbs`}
            style={{ width: width }}
          />
        ))}
      </div>

      <Container>
        <div className='space-y-2'>
          {widths.header.map((width, idx) => (
            <Skeleton
              key={`${idx}-header`}
              className={cn({
                'h-10': idx === 0,
                'h-5': idx === 1,
              })}
              style={{ width: width }}
            />
          ))}
        </div>

        <div className='flex gap-6 my-4'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton className='w-26 h-4.5' key={`${idx}-footer`} />
          ))}
        </div>

        <div className='space-y-12 pt-4'>
          {widths.taskTitle.map((width, idx) => (
            <div key={`${idx}-task-container`} className='space-y-2'>
              <Skeleton
                key={`${idx}-task`}
                className='w-26 h-4'
                style={{ width: width }}
              />

              <Skeleton
                key={idx}
                className='w-26 h-4'
                style={{ width: widths.taskDesc[idx] }}
              />

              <div className='flex gap-6'>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton className='w-19 h-3.5' key={`${idx}-footer`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export { ProjectDetailsSkeleton };
