import type { ProjectData } from '@/lib/http/types/project';
import type { SectionData } from '@/lib/http/types/section';
import type { TaskData } from '@/lib/http/types/task';

export type BoardAction =
  | {
      type: 'PROJECT_UPDATED';
      payload: ProjectData;
    }
  | {
      type: 'SECTION_CREATED' | 'SECTION_UPDATED';
      payload: SectionData;
    }
  | {
      type: 'SECTION_ARCHIVED' | 'SECTION_DELETED';
      payload: Pick<SectionData, 'id'>;
    }
  | {
      type: 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_ARCHIVED';
      payload: TaskData;
    }
  | {
      type: 'TASK_DELETED';
      payload: Pick<TaskData, 'id' | 'section_id'>;
    };
