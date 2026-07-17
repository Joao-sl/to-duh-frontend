import Loading from './loading';
import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { getProjectBoard } from '@/lib/http/get-project-board';
import { ProjectDetailsLayout } from '@/components/project-details';
import { ProjectDetailsBreadcrumb } from '@/components/project-details/navigation/breadcrumb';
import { notFound } from 'next/navigation';

type ProjectDetailsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetails({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const projectId = Number(slug.split('-').at(-1));

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const projectBoard = await getProjectBoard(projectId);

  if (projectBoard.status === 404) {
    notFound();
  }

  if (!projectBoard.success) {
    throw new Error('Board fetch error');
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProjectDetailsBreadcrumb />
      <Container>
        <ProjectDetailsLayout project={projectBoard.data} />
      </Container>
    </Suspense>
  );
}
