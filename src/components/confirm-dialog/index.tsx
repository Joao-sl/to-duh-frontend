'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../ui/dialog';

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Are you sure?',
  description = "This can't be undone.",
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size='sm'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary' size='sm'>
              {cancelLabel}
            </Button>
          </DialogClose>

          <Button variant='destructive' size='sm' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmDialog };
