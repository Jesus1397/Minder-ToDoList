import { Category } from "./Category_interface";

export interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  newTask: { title: string; description?: string | null; category_id: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  categories: Category[];
  handleCreateTask: () => void;
  isEditing?: boolean;
}
