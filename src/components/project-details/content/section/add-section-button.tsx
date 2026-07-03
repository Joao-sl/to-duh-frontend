'use client';

import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { SectionData } from '@/lib/http/types/section';
import { CreateSectionForm } from '@/components/section-form/create-section-form';

type AddSectionProps = {
  projectId: number;
  buttonLabel?: string;
  onSuccess: (data: SectionData) => void;
  isOpened?: (status: boolean) => void;
};

function AddSectionButton({
  projectId,
  buttonLabel,
  onSuccess,
  isOpened,
}: AddSectionProps) {
  const [open, setOpen] = useState(false);

  return open ? (
    <CreateSectionForm
      projectId={projectId}
      onCancel={() => {
        setOpen(false);
        isOpened?.(false);
      }}
      onSuccess={data => {
        setOpen(false);
        onSuccess(data);
        isOpened?.(false);
      }}
      submissionMode='route-handler'
    />
  ) : (
    <Button
      size='sm'
      variant='link'
      className='text-xs'
      onClick={() => {
        setOpen(true);
        isOpened?.(true);
      }}
      aria-label='Add new section'
    >
      <IconPlus aria-hidden /> {buttonLabel}
    </Button>
  );
}

export { AddSectionButton };
