import type { SectionWithTask } from './section';
import type { TaskData } from './task';

export type ProjectData = {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  is_favorite: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectBoardData = ProjectData & {
  sections: SectionWithTask[];
  tasks_without_sections: TaskData[];
};
