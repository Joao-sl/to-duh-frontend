import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import {
  IconCopy,
  IconCopyCheck,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TaskActionsProps = {
  openEditForm: () => void;
  onDelete: () => void;
  onCopy: () => void;
};

function TaskActions({ onDelete, openEditForm, onCopy }: TaskActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const resetTimer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(resetTimer);
  }, [copied]);

  return (
    <div className={cn('flex text-foreground/75')}>
      <ConfirmDialog
        title='Delete task?'
        description='The task will be permanently deleted.'
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={onDelete ?? (() => {})}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon-sm'
            variant='ghost'
            aria-label='Edit task'
            onClick={() => {
              onCopy();
              setCopied(true);
            }}
          >
            {copied ? <IconCopyCheck /> : <IconCopy />}
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <span>{copied ? 'Task copied' : 'Copy task'}</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon-sm'
            variant='ghost'
            aria-label='Edit task'
            onClick={openEditForm}
          >
            <IconPencil />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <span>Edit task</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon-sm'
            variant='ghost'
            aria-label='Delete task'
            onClick={() => setShowDeleteDialog(true)}
            className='hover:text-destructive hover:bg-destructive/15'
          >
            <IconTrash />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <span>Delete task</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export { TaskActions };
