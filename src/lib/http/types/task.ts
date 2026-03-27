export type TaskData = {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  user_id: number;
  project_id: number;
  section_id: number | null;
  due_at: string | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};
