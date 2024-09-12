import axios from "axios";
import { Task } from "../interfaces/Task_interfaces";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>("http://localhost:3000/tasks");
  return response.data;
};

export const createTask = async (
  task: Omit<Task, "id" | "completed">
): Promise<Task> => {
  const response = await axios.post<Task>("http://localhost:3000/tasks", task);
  return response.data;
};
