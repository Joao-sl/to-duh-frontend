import { TaskData } from './task';

export type SectionData = {
  id: number;
  name: string;
  project_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type SectionWithTask = SectionData & {
  tasks: TaskData[];
};
