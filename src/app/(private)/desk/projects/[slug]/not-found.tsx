import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconArrowBackUp, IconArrowForward } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col items-center'>
        <p
          aria-label='Error code 404'
          className='text-[clamp(64px,16vw,110px)] font-bold leading-none'
        >
          404
        </p>

        <h1 className='text-[clamp(21px,10vw,26px)] mt-3 font-semibold'>
          Page not found
        </h1>

        <p className='text-muted-foreground text-center mt-2.5 max-w-80'>
          The page you are looking for doesn&rsquo;t exist or has been moved.
        </p>

        <div className='mt-6.5 max-w-67.5'>
          <Separator decorative />

          <div className='flex gap-2 pt-5'>
            <div aria-hidden className='mt-0.5'>
              <IconArrowForward size={18} />
            </div>

            <p className='text-sm text-muted-foreground'>
              If you update your project name, the new address will be in your
              projects list.
            </p>
          </div>
        </div>

        <Link href='/desk/projects' className='mt-10'>
          <Button size='lg' variant='secondary' className='px-10!'>
            My projects <IconArrowBackUp aria-hidden />
          </Button>
        </Link>
      </div>
    </div>
  );
}
