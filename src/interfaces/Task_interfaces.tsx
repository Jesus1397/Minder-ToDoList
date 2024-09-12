export interface Task {
  id: string;
  title: string;
  description?: string | null;
  category_id: string;
  completed: boolean;
}
