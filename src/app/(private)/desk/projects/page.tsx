import type { Metadata } from 'next';
import { getProjects } from '@/lib/http/get-projects';
import { ProjectsOverview } from '@/components/projects-overview';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Projects() {
  const projects = await getProjects();

  if (!projects.success) {
    throw new Error('Projects fetch error');
  }

  return <ProjectsOverview initialData={projects.data} />;
}
