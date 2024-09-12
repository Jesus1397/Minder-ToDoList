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
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setNewTask({ title: "", description: "", category_id: "" });
      setOpen(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
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
              onToggle={handleToggleTask}
              completed={false}
            />
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              completed={true}
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
              handleClose={() => setOpen(false)}
              newTask={newTask}
              handleInputChange={handleInputChange}
              categories={categories}
              handleCreateTask={handleCreateTask}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
