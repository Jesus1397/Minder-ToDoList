import axios from "axios";
import { TASKS_API } from "../constants/api_constants";
import { Task } from "../interfaces/task_interface";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(TASKS_API);
  return response.data;
};

export const updateTaskStatus = async (id: string, completed: boolean) => {
  await axios.put(`${TASKS_API}/${id}`, { completed: !completed });
};

export const createTask = async (
  newTask: Omit<Task, "id" | "completed">
): Promise<Task> => {
  const response = await axios.post<Task>(TASKS_API, {
    ...newTask,
    completed: false,
  });
  return response.data;
};
