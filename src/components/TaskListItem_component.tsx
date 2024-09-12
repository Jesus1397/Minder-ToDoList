import {
  ListItem,
  Checkbox,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Task } from "../interfaces/Task_interfaces";

interface TaskListItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  getCategoryColor: (categoryId: string) => string;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  getCategoryColor,
}) => {
  return (
    <ListItem
      sx={{
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        margin: "0 0 16px 0",
        borderRadius: "4px",
        backgroundColor: getCategoryColor(task.category_id),
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          sx={{ marginRight: "10px" }}
        />
        <ListItemText
          primary={task.title}
          secondary={task.description ? task.description : null}
        />
      </Box>
      <Box>
        {onEdit && (
          <IconButton
            aria-label="edit"
            onClick={() => onEdit(task.id)}
            sx={{ marginRight: "8px" }}
          >
            <Edit />
          </IconButton>
        )}
        {onDelete && (
          <IconButton aria-label="delete" onClick={() => onDelete(task.id)}>
            <Delete />
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
};

export default TaskListItem;
