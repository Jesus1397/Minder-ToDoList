import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Task } from "../interfaces/Task_interfaces";
import { Category } from "../interfaces/Category_interface";

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggle: (id: string, completed: boolean) => void;
  completed: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categories,
  onToggle,
  completed,
}) => {
  const filteredTasks = tasks.filter((task) => task.completed === completed);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || "#ffffff";
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "8px",
        }}
      >
        {completed ? "Terminadas" : "Pendientes"}
      </Typography>
      {filteredTasks.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            padding: "16px",
            color: "#888",
          }}
        >
          <Typography variant="h6">
            {completed
              ? "No has terminado ninguna tarea aún, ¡Vos podes!🎉"
              : "¡Bien hecho! No tienes tareas pendientes. ✅"}
          </Typography>
        </Box>
      ) : (
        <List
          sx={{
            paddingTop: "0px",
            paddingBottom: "16px",
          }}
        >
          {filteredTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                margin: "0 0 16px 0",
                borderRadius: "4px",
                backgroundColor: getCategoryColor(task.category_id),
                padding: "10px",
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => onToggle(task.id, task.completed)}
                sx={{
                  marginRight: "10px",
                }}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description ? task.description : null}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default TaskList;
