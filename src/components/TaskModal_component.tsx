import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "../interfaces/Category_interface";
import TaskModalForm from "./TaskModalForm_component";
import { modalStyle } from "../styles/styles";

interface TaskModalProps {
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

  const handleCreate = () => {
    if (validateInputs()) {
      handleCreateTask();
    }
  };

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

  const actionButtonLabel = isEditing ? "Guardar cambios" : "Crear";
  const modalTitle = isEditing ? "Editando tarea" : "Nueva tarea";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ p: "24px 24px 16px 24px", m: "0px" }}
        >
          {modalTitle}
        </Typography>
        <TaskModalForm
          newTask={newTask}
          handleInputChange={handleInputChange}
          categories={categories}
          errors={errors}
        />
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
            {actionButtonLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
