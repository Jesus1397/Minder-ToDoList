import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container, CssBaseline, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskList from "./components/TaskList_component";
import TaskModal from "./components/TaskModal_component";
import { theme } from "./utils/ThemeCustom";
import { useTasks } from "./utils/UseTask";

function App() {
  const {
    tasks,
    categories,
    open,
    newTask,
    taskToEdit,
    handleToggleTask,
    handleCreateTask,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
    handleInputChange,
    handleCloseModal,
    setOpen,
  } = useTasks();

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
          <Box sx={{ padding: "10px", height: "100%", overflow: "auto" }}>
            <Typography variant="h3" sx={{ marginBottom: "28px" }}>
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
              sx={{ position: "absolute", bottom: 16, right: 16 }}
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
