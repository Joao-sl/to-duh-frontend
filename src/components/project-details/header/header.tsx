'use client';

import { useEffect, useState } from 'react';
import type { ProjectData } from '@/lib/http/types/project';
import { useBoardContext } from '@/contexts/board-context';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { UpdateProjectForm } from '@/components/project-form/update-project-form';
import { AddTaskButton } from '../content/task/add-task-button';
import { AddSectionButton } from '../content/section/add-section-button';
import { cn } from '@/utils/cn';
import { useSectionActions } from '../content/section/use-section-actions';
import { useTaskActions } from '../content/task/use-task-actions';

function ProjectDetailsHeader() {
  const { board, dispatch } = useBoardContext();
  const { handleSectionCreated } = useSectionActions();
  const { handleTaskCreated } = useTaskActions();
  const [showDialog, setShowDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isOpened, setIsOpened] = useState({
    taskForm: false,
    sectionForm: false,
  });

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

  function handleHeaderOnKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setShowEditForm(true);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setShowEditForm(false);
    }
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
        <div onKeyDown={handleHeaderOnKeyDown}>
          <UpdateProjectForm
            projectId={board.id}
            initialValues={initialValues}
            submissionMode='route-handler'
            onSuccess={handleOnSuccess}
            onCancel={handleOnCancel}
          />
        </div>
      ) : (
        <div
          onClick={() => setShowEditForm(true)}
          className='space-y-2'
          tabIndex={0}
          role='button'
          aria-label='Edit project title and description'
          onKeyDown={handleHeaderOnKeyDown}
        >
          <h1 className='text-3xl font-bold'>{board.name}</h1>

          {board.description && (
            <p className='text-muted-foreground'>{board.description}</p>
          )}
        </div>
      )}

      <div className='flex gap-6 my-4'>
        <div
          className={cn({
            hidden: isOpened.sectionForm,
            'w-full': isOpened.taskForm,
          })}
        >
          <AddTaskButton
            projectId={board.id}
            onSuccess={data => handleTaskCreated(data)}
            buttonLabel='New Task'
            isOpened={status =>
              setIsOpened(() => ({
                sectionForm: false,
                taskForm: status,
              }))
            }
          />
        </div>

        <div
          className={cn({
            hidden: isOpened.taskForm,
            'w-full': isOpened.sectionForm,
          })}
        >
          <AddSectionButton
            projectId={board.id}
            onSuccess={data => handleSectionCreated(data)}
            buttonLabel='New Section'
            isOpened={status =>
              setIsOpened(() => ({
                sectionForm: status,
                taskForm: false,
              }))
            }
          />
        </div>
      </div>
    </header>
  );
}

export { ProjectDetailsHeader };
