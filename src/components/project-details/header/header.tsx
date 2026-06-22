'use client';

import { useEffect, useState } from 'react';
import { ProjectData } from '@/lib/http/get-projects';
import { useBoardContext } from '@/contexts/board-context';
import { ConfirmDialog } from '../confirm-dialog';
import { UpdateProjectForm } from '../project-form/update-project-form';

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
      <ConfirmDialog
        title='Discard changes?'
        description="This can't be undone and you'll lose your draft."
        confirmLabel='Discard'
        open={showDialog}
        onOpenChange={setShowDialog}
        onConfirm={() => {
          setShowEditForm(false);
          setShowDialog(false);
        }}
      />

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
