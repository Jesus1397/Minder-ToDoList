import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Category } from "../interfaces/Category_interface";
import { modalStyle } from "../styles/Modal_style";
import { useState, useEffect } from "react";

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
}) => {
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    category_id: false,
  });

  const validateInputs = () => {
    const hasErrors = {
      title: !newTask.title.trim(),
      description: !newTask.description.trim(),
      category_id: !newTask.category_id.trim(),
    };
    setErrors(hasErrors);
    return !Object.values(hasErrors).includes(true);
  };

  const handleCreate = () => {
    if (validateInputs()) {
      handleCreateTask();
    }
  };

  const resetValidation = () => {
    setErrors({ title: false, description: false, category_id: false });
  };

  useEffect(() => {
    if (!open) {
      resetValidation();
    }
  }, [open]);

  const getFieldColor = (field: keyof typeof errors) => {
    if (errors[field]) {
      return "error";
    } else if (newTask[field].trim() !== "") {
      return "success";
    }
    return "primary";
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle, p: "24px 24px 16px 24px" }}>
        <Typography variant="h6" gutterBottom>
          Nueva tarea
        </Typography>
        <Box sx={{ p: "10px" }}>
          <Box sx={{ padding: "0 24px 20px 24px" }}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              margin="normal"
              inputProps={{ maxLength: 40 }}
              required
              color={getFieldColor("title")}
              error={errors.title}
              helperText={errors.title ? "El título es requerido" : ""}
              variant="standard"
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              margin="normal"
              inputProps={{ maxLength: 100 }}
              color={getFieldColor("description")}
              error={errors.description}
              helperText={
                errors.description ? "La descripción es requerida" : ""
              }
              variant="standard"
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
              color={getFieldColor("category_id")}
              error={errors.category_id}
              helperText={errors.category_id ? "La categoría es requerida" : ""}
              variant="standard"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ ml: 2 }}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
