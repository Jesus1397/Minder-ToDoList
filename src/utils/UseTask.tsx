import { useState, useEffect } from "react";
import axios from "axios";
import { CATEGORIES_API, TASK_API_BASE } from "../constants/api_constants";
import { Task } from "../interfaces/Task_interfaces";
import { Category } from "../interfaces/Category_interface";
import { fetchTasks, createTask } from "./TaskFunctions";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    category_id: "",
    completed: false,
  });
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchTasks();
        const categoriesResponse = await axios.get<Category[]>(CATEGORIES_API);
        setTasks(tasksData);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggleTask = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };
      await axios.put(`${TASK_API_BASE}/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    }
  };

  const isValidTask = () => newTask.title && newTask.category_id;

  const handleCreateTask = async () => {
    if (isValidTask()) {
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
      await axios.put(`${TASK_API_BASE}/${taskToEdit.id}`, taskToEdit);
      setTasks(
        tasks.map((task) => (task.id === taskToEdit.id ? taskToEdit : task))
      );
      setTaskToEdit(null);
      setOpen(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await axios.delete(`${TASK_API_BASE}/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (taskToEdit) {
      setTaskToEdit((prev: Task | null) =>
        prev ? { ...prev, [name]: value } : prev
      );
    } else {
      setNewTask((prev: Omit<Task, "id">) => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseModal = () => {
    setNewTask({
      title: "",
      description: "",
      category_id: "",
      completed: false,
    });
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
