import { Metadata } from 'next';
import Loading from './loading';
import { Suspense } from 'react';
import { getSectionsList } from '@/lib/http/section/get';
import { SectionsOverview } from '@/components/sections-overview';

export const metadata: Metadata = {
  title: 'Sections',
};

export default async function Sections() {
  const sections = await getSectionsList();

  if (!sections.success) {
    throw new Error('Sections fetch error');
  }

  return (
    <Suspense fallback={<Loading />}>
      <SectionsOverview initialData={sections.data} />
    </Suspense>
  );
}
