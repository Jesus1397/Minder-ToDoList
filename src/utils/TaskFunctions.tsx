import axios from "axios";
import { TASK_API_BASE } from "../constants/api_constants";
import { Task } from "../interfaces/Task_interfaces";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(TASK_API_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const createTask = async (
  task: Omit<Task, "id" | "completed">
): Promise<Task> => {
  try {
    const response = await axios.post<Task>(TASK_API_BASE, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
