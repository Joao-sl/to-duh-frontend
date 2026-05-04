import { isValidElement, useState } from 'react';
import { ProjectData } from '@/lib/http/get-projects';
import { useProjectsContext } from '@/contexts/projects-context';
import { CreateProjectForm } from '../project-form/create-project-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type CreateProjectModalProps = {
  children: React.ReactNode;
};

function CreateProjectModal({ children }: CreateProjectModalProps) {
  const [open, setOpen] = useState(false);
  const { setProjects } = useProjectsContext();

  const isElement = isValidElement(children);
  const asChild = isElement ? true : false;

  function handleSuccess(projData: ProjectData) {
    setProjects(prev => {
      if (!prev.success) {
        return prev;
      }

      return { ...prev, data: [projData, ...prev.data] };
    });

    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)} asChild={asChild}>
        {children}
      </DialogTrigger>

      <DialogContent className='space-y-4'>
        <DialogHeader>
          <DialogTitle>Creating a project</DialogTitle>
          <DialogDescription>
            Create a project to hold your tasks
          </DialogDescription>
        </DialogHeader>

        <CreateProjectForm
          onCancel={() => setOpen(false)}
          onSuccess={data => handleSuccess(data)}
          submissionMode='route-handler'
        />
      </DialogContent>
    </Dialog>
  );
}

export { CreateProjectModal };
