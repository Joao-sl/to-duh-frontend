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

type UnsavedChangesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function UnsavedChangesDialog({
  open,
  onOpenChange,
  onConfirm,
}: UnsavedChangesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

          <Button variant='destructive' size='sm' onClick={onConfirm}>
            Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { UnsavedChangesDialog };
