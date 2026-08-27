import { Metadata } from 'next';
import Loading from './loading';
import { Suspense } from 'react';
import { apiClient } from '@/helpers/api-client';
import { SectionsOverview } from '@/components/sections-overview';

export const metadata: Metadata = {
  title: 'Sections',
};

export default async function Sections() {
  let sections;

  try {
    const response = await apiClient.get('/sections');
    const json = await response.json();
    sections = response.ok ? { success: true, data: json } : { success: false };
  } catch {
    sections = { success: false };
  }

  if (!sections.success) {
    throw new Error('Sections fetch error');
  }

  return (
    <Suspense fallback={<Loading />}>
      <SectionsOverview initialData={sections.data} />
    </Suspense>
  );
}
