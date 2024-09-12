import { Category } from "./Category_interface";
import { Task } from "./Task_interfaces";

export interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggle: (id: string, completed: boolean) => void;
  completed: boolean;
}
