import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import { Task } from "../interfaces/Task_interfaces";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  completed: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, completed }) => (
  <>
    <Typography variant="h6" gutterBottom>
      {completed ? "Terminadas" : "Pendientes"}
    </Typography>
    <List>
      {tasks
        .filter((task) => task.completed === completed)
        .map((task) => (
          <ListItem
            key={task.id}
            sx={{
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              margin: "16px 0",
              borderRadius: "4px",
              backgroundColor: "#fff",
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task.id, task.completed)}
            />
            <ListItemText
              primary={task.title}
              secondary={task.description || "Sin descripción"}
            />
          </ListItem>
        ))}
    </List>
  </>
);

export default TaskList;
