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
    <Typography
      variant="h6"
      sx={{
        marginBottom: "8px",
      }}
    >
      {completed ? "Terminadas" : "Pendientes"}
    </Typography>
    <List
      sx={{
        paddingTop: "0px",
        paddingBottom: "16px",
      }}
    >
      {tasks
        .filter((task) => task.completed === completed)
        .map((task) => (
          <ListItem
            key={task.id}
            sx={{
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              margin: "0 0 16px 0",
              borderRadius: "4px",
              backgroundColor: "#fff",
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
              secondary={task.description || "Sin descripción"}
            />
          </ListItem>
        ))}
    </List>
  </>
);

export default TaskList;
