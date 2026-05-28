'use client';

import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { ProjectData } from '@/lib/http/get-projects';
import { useBoardContext } from '@/contexts/board-context';
import { UpdateProjectForm } from '../project-form/update-project-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../ui/dialog';

function ProjectDetailsHeader() {
  const { board, dispatch } = useBoardContext();
  const [showDialog, setShowDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    document.title = `${board.name} \u2014 to-duh`;
  }, [board.name]);

  const initialValues = {
    id: board.id,
    user_id: board.user_id,
    name: board.name,
    description: board.description,
    is_favorite: board.is_favorite,
    is_archived: board.is_archived,
    created_at: board.created_at,
    updated_at: board.updated_at,
  };

  function handleOnSuccess(data: ProjectData) {
    dispatch({ type: 'PROJECT_UPDATED', payload: data });
    setShowEditForm(false);
  }

  function handleOnCancel(formIsDirty: boolean) {
    if (formIsDirty) {
      return setShowDialog(true);
    }
    setShowEditForm(false);
  }

  return (
    <header>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent size='sm'>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>
            This can&apos;t be undone and you&apos;ll lose your draft.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary' size='sm'>
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant='destructive'
              size='sm'
              onClick={() => {
                setShowEditForm(false);
                setShowDialog(false);
              }}
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showEditForm ? (
        <UpdateProjectForm
          projectId={board.id}
          initialValues={initialValues}
          submissionMode='route-handler'
          onSuccess={handleOnSuccess}
          onCancel={handleOnCancel}
        />
      ) : (
        <div onClick={() => setShowEditForm(true)} className='space-y-2'>
          <h1 className='text-3xl font-bold'>{board.name}</h1>
          {board.description && (
            <p className='text-muted-foreground'>{board.description}</p>
          )}
        </div>
      )}
    </header>
  );
}

export { ProjectDetailsHeader };
