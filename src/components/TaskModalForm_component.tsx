import { Box, TextField, MenuItem } from "@mui/material";
import { Category } from "../interfaces/Category_interface";

interface TaskModalFormProps {
  newTask: { title: string; description?: string | null; category_id: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  categories: Category[];
  errors: {
    title: boolean;
    description: boolean;
    category_id: boolean;
  };
}

const TaskModalForm: React.FC<TaskModalFormProps> = ({
  newTask,
  handleInputChange,
  categories,
  errors,
}) => {
  const getTitleErrorText = () =>
    errors.title
      ? "El título es obligatorio y no puede exceder 40 caracteres"
      : "";

  const getDescriptionErrorText = () =>
    errors.description ? "La descripción no puede exceder 100 caracteres" : "";

  const getCategoryErrorText = () =>
    errors.category_id ? "La categoría es obligatoria" : "";

  return (
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
          helperText={getTitleErrorText()}
          variant="standard"
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={newTask.description || ""}
          onChange={handleInputChange}
          inputProps={{ maxLength: 100 }}
          error={errors.description}
          helperText={getDescriptionErrorText()}
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
          helperText={getCategoryErrorText()}
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
  );
};

export default TaskModalForm;
