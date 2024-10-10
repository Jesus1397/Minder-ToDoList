import axios from "axios"; // Importamos la librería axios que se usa para hacer peticiones HTTP.
import { TASK_API_BASE } from "../constants/api_constants"; // Importamos la URL base para la API de tareas.
import { Task } from "../interfaces/Task_interfaces"; // Importamos la interfaz 'Task' para definir la estructura de los datos de una tarea.
import { fetchTasks, createTask } from "../utils/TaskFunctions"; // Importamos las funciones a probar: fetchTasks y createTask.

jest.mock("axios"); // Simulamos la librería axios para evitar hacer peticiones reales durante las pruebas.
const mockedAxios = axios as jest.Mocked<typeof axios>; // Creamos una versión "mockeada" de axios para controlarla en nuestras pruebas.

describe("Pruebas de Task Service", () => {
  // Grupo de pruebas para el servicio de tareas.

  describe("Funcion de fetchTasks", () => {
    // Grupo de pruebas para la función fetchTasks.

    it("T1: debería devolver una lista de tareas cuando la API responde correctamente", async () => {
      // Esta prueba valida que fetchTasks devuelva una lista de tareas cuando la API funciona correctamente.

      const mockTasks: Task[] = [
        // Creamos un mock (falso) de una lista de tareas, que es lo que esperamos que devuelva la API.
        {
          id: "664a90a5-22ed-588c-b113-b6373f5f4dd3",
          title: "Comprar 2kg de tomates",
          description: "Bien maduros",
          category_id: "46265b1f-ffba-5cd2-9d55-36ec7e3ac095",
          completed: false,
        },
        {
          id: "c77b2e4c-0992-55b4-ac93-a6dad915a754",
          title: "Crear app para hacerme millonario 🤑",
          description: null,
          category_id: "65125b62-8778-5bc8-89ac-098057b9a390",
          completed: false,
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockTasks });
      // Simulamos que axios.get resuelve correctamente con la lista de tareas mockeadas.

      const result = await fetchTasks(); // Llamamos a la función fetchTasks que debería hacer la petición a la API.
      expect(result).toEqual(mockTasks); // Verificamos que el resultado sea igual al mock de las tareas.
      expect(mockedAxios.get).toHaveBeenCalledWith(TASK_API_BASE);
      // Verificamos que axios.get haya sido llamado con la URL correcta.
    });

    it("T2: debería lanzar un error cuando la API falla", async () => {
      // Esta prueba verifica que la función fetchTasks lance un error si la API falla.

      mockedAxios.get.mockRejectedValueOnce(
        new Error("Error al obtener las tareas")
      );
      // Simulamos que axios.get falla con un error.

      await expect(fetchTasks()).rejects.toThrow("Failed to fetch tasks");
      // Verificamos que fetchTasks lance un error con el mensaje adecuado.
      expect(mockedAxios.get).toHaveBeenCalledWith(TASK_API_BASE);
      // Verificamos que axios.get haya sido llamado con la URL correcta, incluso cuando falla.
    });
  });

  describe("Funcion de createTask", () => {
    // Grupo de pruebas para la función createTask.

    it("T1: debería crear una nueva tarea cuando la API responde correctamente", async () => {
      // Esta prueba valida que createTask cree una nueva tarea cuando la API funciona correctamente.

      const newTask = {
        // Datos de la nueva tarea que se va a enviar a la API.
        title: "Nueva tarea",
        description: "Descripción de nueva tarea",
        category_id: "49078200-32bd-5718-a6e5-5c4e08c0ed9c",
      };
      const createdTask: Task = {
        // Esta es la tarea que simulamos que la API devolverá después de ser creada.
        id: "cbdb75a0-5808-556b-8f6c-fbe2c162752b",
        title: "Festejar el año 2064",
        description: "Armar una gran fiesta para el año 2064 🥳💃🎉🎊",
        category_id: "49078200-32bd-5718-a6e5-5c4e08c0ed9c",
        completed: false,
      };

      mockedAxios.post.mockResolvedValueOnce({ data: createdTask });
      // Simulamos que axios.post resuelve correctamente con la tarea creada.

      const result = await createTask(newTask); // Llamamos a la función createTask que debería hacer la petición POST a la API.
      expect(result).toEqual(createdTask);
      // Verificamos que el resultado sea igual a la tarea creada que hemos mockeado.
      expect(mockedAxios.post).toHaveBeenCalledWith(TASK_API_BASE, newTask);
      // Verificamos que axios.post haya sido llamado con la URL correcta y los datos de la nueva tarea.
    });

    it("T2: debería lanzar un error cuando la API falla al crear la tarea", async () => {
      // Esta prueba verifica que la función createTask lance un error si la API falla.

      const newTask = {
        // Datos de la nueva tarea que se intentará crear.
        title: "Nueva tarea",
        description: "Descripción de nueva tarea",
        category_id: "49078200-32bd-5718-a6e5-5c4e08c0ed9c",
      };

      mockedAxios.post.mockRejectedValueOnce(
        new Error("Error al crear la tarea")
      );
      // Simulamos que axios.post falla con un error.

      await expect(createTask(newTask)).rejects.toThrow(
        "Failed to create task"
      );
      // Verificamos que createTask lance un error con el mensaje adecuado.
      expect(mockedAxios.post).toHaveBeenCalledWith(TASK_API_BASE, newTask);
      // Verificamos que axios.post haya sido llamado con la URL correcta y los datos de la tarea, incluso cuando falla.
    });
  });
});
