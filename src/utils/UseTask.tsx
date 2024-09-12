import { useState, useEffect } from "react";
import axios from "axios";
import { CATEGORIES_API } from "../constants/api_constants";
import { Task } from "../interfaces/Task_interfaces";
import { Category } from "../interfaces/Category_interface";
import { fetchTasks, createTask } from "./TaskFuctions";

export const useTasks = () => {
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
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    }
  };

  const handleCreateTask = async () => {
    if (newTask.title && newTask.category_id) {
      const createdTask = await createTask({
        ...newTask,
        description: newTask.description?.trim() ? newTask.description : null,
      });
      setTasks([...tasks, createdTask]);
      handleCloseModal();
    }
  };

  const handleEditTask = (id: string) => {
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
      setTasks(
        tasks.map((task) => (task.id === taskToEdit.id ? taskToEdit : task))
      );
      setTaskToEdit(null);
      setOpen(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    taskToEdit
      ? setTaskToEdit({ ...taskToEdit!, [name]: value })
      : setNewTask({ ...newTask, [name]: value });
  };

  const handleCloseModal = () => {
    setNewTask({ title: "", description: "", category_id: "" });
    setTaskToEdit(null);
    setOpen(false);
  };

  return {
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
  };
};
