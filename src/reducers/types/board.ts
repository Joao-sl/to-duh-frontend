import { ProjectData } from '@/lib/http/get-projects';
import { SectionData } from '@/lib/http/types/section';
import { TaskData } from '@/lib/http/types/task';

export type BoardAction =
  | {
      type: 'PROJECT_UPDATED';
      payload: ProjectData;
    }
  | {
      type: 'SECTION_UPDATED';
      payload: SectionData;
    }
  | {
      type: 'TASK_UPDATED' | 'TASK_ARCHIVED';
      payload: TaskData;
    }
  | {
      type: 'TASK_DELETED';
      payload: Pick<TaskData, 'id' | 'section_id'>;
    };
