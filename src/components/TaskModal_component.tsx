import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Category } from "../interfaces/Category_interface";
import { modalStyle } from "../styles/modal_style";

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  newTask: { title: string; description: string; category_id: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  categories: Category[];
  handleCreateTask: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  newTask,
  handleInputChange,
  categories,
  handleCreateTask,
}) => (
  <Modal open={open} onClose={handleClose}>
    <Box sx={modalStyle}>
      <Typography variant="h6" gutterBottom>w
        Nueva tarea
      </Typography>
      <TextField
        fullWidth
        label="Título"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        margin="normal"
        inputProps={{ maxLength: 40 }}
        required
      />
      <TextField
        fullWidth
        label="Descripción"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        margin="normal"
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        fullWidth
        select
        label="Categoría"
        name="category_id"
        value={newTask.category_id}
        onChange={handleInputChange}
        margin="normal"
        required
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateTask}
        sx={{ mt: 2 }}
      >
        Crear
      </Button>
      <Button variant="outlined" onClick={handleClose} sx={{ mt: 2, ml: 2 }}>
        Cancelar
      </Button>
    </Box>
  </Modal>
);

export default TaskModal;
