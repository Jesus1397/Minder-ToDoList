import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container, Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskList from "./components/TaskList_component";
import TaskModal from "./components/TaskModal_component";
import { theme } from "./utils/ThemeCustom";
import { useTasks } from "./utils/UseTask";
import { containerStyles, boxStyles, fabStyles } from "./styles/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
        <Container maxWidth="md" sx={containerStyles}>
          <Box sx={boxStyles}>
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
              sx={fabStyles}
            >
              <AddIcon />
            </Fab>
            <TaskModal
              open={open}
              handleClose={handleCloseModal}
              newTask={taskToEdit || newTask}
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
