import { List, Typography, Box } from "@mui/material";
import { Category } from "../interfaces/Category_interface";
import { Task } from "../interfaces/Task_interfaces";
import TaskListItem from "./TaskListItem_component";

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggle: (id: string, completed: boolean) => void;
  completed: boolean;
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categories,
  onToggle,
  completed,
  onEdit,
  onDelete,
}) => {
  const filteredTasks = tasks.filter((task) => task.completed === completed);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) {
      console.warn(`Category with id ${categoryId} not found`);
      return "#ffffff";
    }
    return category.color || "#ffffff";
  };

  const emptyMessage = completed
    ? "No has terminado ninguna tarea aún, ¡Vos podes!🎉"
    : "¡Bien hecho! No tienes tareas pendientes. ✅";

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        {completed ? "Terminadas" : "Pendientes"}
      </Typography>
      {filteredTasks.length === 0 ? (
        <Box sx={{ textAlign: "center", padding: "16px", color: "#888" }}>
          <Typography variant="h6">{emptyMessage}</Typography>
        </Box>
      ) : (
        <List sx={{ paddingTop: "0px", paddingBottom: "16px" }}>
          {filteredTasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskList;
