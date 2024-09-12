# Task Management App

## Descripción

Aplicación de gestión de tareas que permite crear, editar, eliminar y gestionar tareas pendientes y completadas. La información se guarda en una base de datos usando una API REST, y el diseño se ajusta a lo solicitado en Figma.

## Funcionalidades

- **Listado de tareas:** Muestra tareas "Pendientes" y "Terminadas" con su título, descripción, categoría y estado.
- **Gestión de estado:** Permite marcar tareas como completadas o pendientes con un checkbox.
- **Colores por categoría:** Las tareas se muestran con un color de fondo según su categoría, o blanco por defecto.
- **Formulario de creación:** Abre el formulario desde el botón "+", con validaciones para el título (obligatorio, 40 caracteres), descripción (opcional, 100 caracteres) y categoría (obligatoria, seleccionable).
- **Persistencia de datos:** Todas las acciones se guardan en una base de datos mediante API REST.

## Plus

- **Edición y eliminación:** Las tareas pueden ser editadas o eliminadas.
- **Mensajes informativos:** cuando no hay tareas en las listas de Pendientes y Terminadas, para que no se vean vacías.

## ¿Cómo ejecutar?

Para iniciar la API REST (json-server) ejecutar `npm run db`.

Para inciar la aplicación ejecutar `npm run dev`.
