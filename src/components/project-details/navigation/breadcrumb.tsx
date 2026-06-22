'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

function ProjectDetailsBreadcrumb() {
  const pathname = usePathname();
  const splitted = pathname.split('/').filter(value => value);

  return (
    <Breadcrumb className='p-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {splitted.map((path, idx) => {
          if (splitted.length === idx + 1) {
            return <BreadcrumbPage key={idx}>{path}</BreadcrumbPage>;
          }

          return (
            <Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${idx === 0 ? '' : 'desk/'}${path}`}>
                  {path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { ProjectDetailsBreadcrumb };
