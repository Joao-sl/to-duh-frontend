'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { type SectionData } from '@/lib/http/types/section';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IconArchive,
  IconDots,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

type SectionDropdownProps = {
  section: Pick<SectionData, 'id' | 'name'>;
  openEditForm: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

function SectionDropdown({
  openEditForm,
  onArchive,
  onDelete,
}: SectionDropdownProps) {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div>
      <ConfirmDialog
        title='Archive section?'
        description='The section will be archived. Tasks will keep their current status but will be hidden.'
        open={showArchiveDialog}
        onOpenChange={setShowArchiveDialog}
        onConfirm={onArchive}
      />

      <ConfirmDialog
        title='Delete section?'
        description='The section will be deleted. All tasks related to this section will be deleted too.'
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={onDelete}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild aria-label='Open section actions'>
          <Button variant='ghost' size='icon-sm'>
            <IconDots />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openEditForm}>
              <IconPencil /> Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setShowArchiveDialog(true)}>
              <IconArchive /> Archive
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant='destructive'
              onClick={() => setShowDeleteDialog(true)}
            >
              <IconTrash /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { SectionDropdown };
