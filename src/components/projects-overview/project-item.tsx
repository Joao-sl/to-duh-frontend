import Link from 'next/link';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';
import { type ProjectData } from '@/lib/http/types/project';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

type ProjectCardData = {
  project: ProjectData;
  href: string;
};

function ProjectItem({ project, href }: ProjectCardData) {
  const description = project.description
    ? project.description
    : 'No description';

  return (
    <li className='relative hover:bg-accent/20 rounded-2xl overflow-hidden'>
      <Link href={href} className='flex items-center gap-4 py-4.5 px-4'>
        <div className='flex-1'>
          <h2
            title={project.name}
            className='text-[15px] font-semibold line-clamp-1'
          >
            {project.name}
          </h2>

          <p
            title={description}
            className={cn('text-muted-foreground line-clamp-1 text-[13px]', {
              italic: !project.description,
            })}
          >
            {description}
          </p>
        </div>

        <time className='text-muted-foreground text-[12.5px]'>
          Created at {format(project.created_at, 'dd MMMM yyyy')}
        </time>

        <div
          className='hover:scale-105'
          title={project.is_favorite ? 'Is favorite' : 'Not favorite'}
        >
          {project.is_favorite ? (
            <IconStarFilled
              size={16}
              aria-label='Is favorite'
              className='text-yellow-400 dark:text-yellow-500'
            />
          ) : (
            <IconStar
              size={16}
              aria-label='Not favorite'
              className='text-muted-foreground'
            />
          )}
        </div>
      </Link>
    </li>
  );
}

export { ProjectItem };
