import { SectionWithTask } from './section';
import { TaskData } from './task';

export type ProjectData = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  is_favorite: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectBoardData = ProjectData & {
  sections: SectionWithTask[];
  tasks_without_sections: TaskData[];
};
