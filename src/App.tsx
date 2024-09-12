import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, Container, CssBaseline, Fab, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList_component";
import TaskModal from "./components/TaskModal_component";
import { CATEGORIES_API } from "./constants/api_constants";
import { Category } from "./interfaces/Category_interface";
import { fetchTasks, createTask } from "./utils/TaskFuctions";
import { Task } from "./interfaces/Task_interfaces";
import { theme } from "./utils/ThemeCustom";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completed">>({
    title: "",
    description: "",
    category_id: "",
  });
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await fetchTasks();
      const categoriesResponse = await axios.get<Category[]>(CATEGORIES_API);
      setTasks(tasksData);
      setCategories(categoriesResponse.data);
    };
    fetchData();
  }, []);

  const handleToggleTask = async (id: string, completed: boolean) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      await axios.put(`http://localhost:3000/tasks/${id}`, {
        ...taskToUpdate,
        completed: !completed,
      });
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleCreateTask = async () => {
    if (newTask.title && newTask.category_id) {
      const taskToCreate = {
        ...newTask,
        description: newTask.description?.trim() ? newTask.description : null,
      };
      const createdTask = await createTask(taskToCreate);
      setTasks([...tasks, createdTask]);
      handleCloseModal();
    }
  };

  const handleEditTask = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTaskToEdit(task);
      setOpen(true);
    }
  };

  const handleUpdateTask = async () => {
    if (taskToEdit) {
      await axios.put(
        `http://localhost:3000/tasks/${taskToEdit.id}`,
        taskToEdit
      );
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? taskToEdit : task
      );
      setTasks(updatedTasks);
      setTaskToEdit(null);
      setOpen(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (taskToEdit) {
      setTaskToEdit((prev) => ({
        ...prev!,
        [name]: value,
      }));
    } else {
      setNewTask((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCloseModal = () => {
    setNewTask({ title: "", description: "", category_id: "" });
    setTaskToEdit(null);
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="md"
          sx={{
            padding: "64px 24px 40px 24px",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              height: "100%",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                marginBottom: "28px",
              }}
            >
              Lista de tareas
            </Typography>
            <TaskList
              tasks={tasks}
              categories={categories}
              onToggle={handleToggleTask}
              completed={false}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            <TaskList
              tasks={tasks}
              categories={categories}
              onToggle={handleToggleTask}
              completed={true}
              onDelete={handleDeleteTask}
            />
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpen(true)}
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
              }}
            >
              <AddIcon />
            </Fab>
            <TaskModal
              open={open}
              handleClose={handleCloseModal}
              newTask={taskToEdit ? taskToEdit : newTask}
              handleInputChange={handleInputChange}
              categories={categories}
              handleCreateTask={
                taskToEdit ? handleUpdateTask : handleCreateTask
              }
              isEditing={!!taskToEdit}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
