import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { modalStyle } from "../styles/Modal_style";
import { useState } from "react";
import { TaskModalProps } from "../interfaces/TaskModalProps_interface";

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  newTask,
  handleInputChange,
  categories,
  handleCreateTask,
  isEditing = false,
}) => {
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    category_id: false,
  });

  const validateInputs = () => {
    const hasErrors = {
      title: !newTask.title.trim() || newTask.title.length > 40,
      description: newTask.description
        ? newTask.description.length > 100
        : false,
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

  const handleModalClose = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ p: "24px 24px 16px 24px", m: "0px" }}
        >
          {isEditing ? "Editando tarea" : "Nueva tarea"}{" "}
        </Typography>
        <Box sx={{ padding: "0 24px 20px 24px" }}>
          <Box sx={{ padding: "10px" }}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              inputProps={{ maxLength: 40 }}
              required
              error={errors.title}
              helperText={
                errors.title
                  ? "El título es obligatorio y no puede exceder 40 caracteres"
                  : ""
              }
              variant="standard"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              inputProps={{ maxLength: 100 }}
              error={errors.description}
              helperText={
                errors.description
                  ? "La descripción no puede exceder 100 caracteres"
                  : ""
              }
              variant="standard"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              select
              label="Categoría"
              name="category_id"
              value={newTask.category_id}
              onChange={handleInputChange}
              required
              error={errors.category_id}
              helperText={
                errors.category_id ? "La categoría es obligatoria" : ""
              }
              variant="standard"
              sx={{ marginBottom: "16px" }}
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
          <Button variant="outlined" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ ml: 2 }}
          >
            {isEditing ? "Guardar cambios" : "Crear"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
