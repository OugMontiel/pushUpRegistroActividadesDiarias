[TOC]

# Estructura de la API (Especificaciones Técnicas)

1. **Acceso a la API:**
   - Es necesario estar logueado.
   - Cada router debe validar la sesión activa con el formato **JWT**.
   - Las sesiones tienen un tiempo máximo de expiración de 30 minutos.
   - Mensaje al caducar: "sesión expirada" (con el Formato de Respuesta).
2. **Tasas de solicitudes por tipo de método:**
   - Métodos POST - **iniciar Sesión**:
     - Máximo de 3 solicitudes.
     - Se refrescan después de 3 minutos.
   - Métodos GET:
     - Máximo de 25 solicitudes.
     - Se refrescan después de 15 minutos.
   - Métodos POST:
     - Máximo de 45 solicitudes.
     - Se refrescan después de 15 minutos.
   - Métodos DELETE:
     - Máximo de 10 solicitudes.
     - Se refrescan después de 10 minutos.
   - Métodos PUT:
     - Máximo de 45 solicitudes.
     - Se refrescan después de 15 minutos.
3. **Mensajes al alcanzar la tasa máxima:**
   - Mensaje para **iniciar Sesión**  "Espera 3 minutos antes de volver a intentarlo." (con el Formato de Respuesta).
   - Mensaje de "tasa superada" (con el Formato de Respuesta).



## Endpoints que deben desarrollarse

| Método HTTP | Endpoint                              | Descripción                                             |
| ----------- | ------------------------------------- | ------------------------------------------------------- |
| POST        | `/usuarios`                       | Crear un nuevo usuario.<br />**Nota:** La contraseña del usuario debe estar encriptada al momento de registrar un nuevo usuario en la base de datos. Los datos de prueba no tienen la contraseña encriptada. Se recomienda utilizar la librería mencionada en las clases para realizar la encriptación su validación. |
| POST | `/usuarios/iniciarSesion `        | Obtener la información del usuario excluyendo **contrasena_hash** y el campo **fecha_de_creacion**, debe devolver la fecha y hora actual del inicio de sesión. Además, se debe cambiar el nombre del campo a **fecha_y_hora_de_inicio_de_sesion**. |
| POST | `/usuarios/validarSesion `        | Descifrar la sesión proporcionada en el **header Authorization: Bearer <token>** y retornar la información que incluye. |
| GET         | `/usuarios`                       | Obtener todos los usuarios.                             |
| GET         | `/usuarios/{id}`                  | Obtener un usuario específico por ID.                   |
| PUT         | `/usuarios/{id}`                  | Actualizar un usuario específico por ID.                |
| DELETE      | `/usuarios/{id}`                  | Eliminar un usuario específico por ID.                  |
| POST        | `/actividades`                    | Crear una nueva actividad.                              |
| GET         | `/actividades`                    | Obtener todas las actividades.                          |
| GET         | `/actividades/{id}`               | Obtener una actividad específica por ID.                |
| PUT         | `/actividades/{id}`               | Actualizar una actividad específica por ID.             |
| DELETE      | `/actividades/{id}`               | Eliminar una actividad específica por ID.               |
| POST        | `/recordatorios`                  | Crear un nuevo recordatorio.                            |
| GET         | `/recordatorios`                  | Obtener todos los recordatorios.                        |
| GET         | `/recordatorios/{id}`             | Obtener un recordatorio específico por ID.              |
| PUT         | `/recordatorios/{id}`             | Actualizar un recordatorio específico por ID.           |
| DELETE      | `/recordatorios/{id}`             | Eliminar un recordatorio específico por ID.             |
| POST        | `/objetivos`                      | Crear un nuevo objetivo.                                |
| GET         | `/objetivos`                      | Obtener todos los objetivos.                            |
| GET         | `/objetivos/{id}`                 | Obtener un objetivo específico por ID.                  |
| PUT         | `/objetivos/{id}`                 | Actualizar un objetivo específico por ID.               |
| DELETE      | `/objetivos/{id}`                 | Eliminar un objetivo específico por ID.                 |
| POST        | `/etiquetas`                      | Crear una nueva etiqueta.                               |
| GET         | `/etiquetas`                      | Obtener todas las etiquetas.                            |
| GET         | `/etiquetas/{id}`                 | Obtener una etiqueta específica por ID.                 |
| PUT         | `/etiquetas/{id}`                 | Actualizar una etiqueta específica por ID.              |
| DELETE      | `/etiquetas/{id}`                 | Eliminar una etiqueta específica por ID.                |
| POST        | `/categorias`                     | Crear una nueva categoría.                              |
| GET         | `/categorias`                     | Obtener todas las categorías.                           |
| GET         | `/categorias/{id}`                | Obtener una categoría específica por ID.                |
| PUT         | `/categorias/{id}`                | Actualizar una categoría específica por ID.             |
| DELETE      | `/categorias/{id}`                | Eliminar una categoría específica por ID.               |
| POST        | `/actividades/{id}/etiquetas`     | Asignar etiquetas a una actividad específica.           |
| GET         | `/actividades/{id}/etiquetas`     | Obtener etiquetas asignadas a una actividad específica. |
| POST        | `/actividades/{id}/colaboradores` | Asignar colaboradores a una actividad específica.       |
| GET         | `/actividades/{id}/colaboradores` | Obtener colaboradores de una actividad específica.      |
| POST        | `/hitos`             | Crear un nuevo hito para un objetivo.                        |
| GET         | `/hitos`             | Obtener todos los hitos.                                     |
| GET         | `/hitos/{id}`        | Obtener un hito específico por ID.                           |
| PUT         | `/hitos/{id}`        | Actualizar un hito específico por ID.                        |
| DELETE      | `/hitos/{id}`        | Eliminar un hito específico por ID.                          |
| POST        | `/estadisticas`      | Registrar estadísticas de un usuario (actividades y objetivos completados). |
| GET         | `/estadisticas`      | Obtener todas las estadísticas de todos los usuarios.        |
| GET         | `/estadisticas/{id}` | Obtener las estadísticas específicas de un usuario por ID.   |
| POST        | `/reportes`          | Crear un nuevo reporte de rendimiento.                       |
| GET         | `/reportes`          | Obtener todos los reportes de rendimiento.                   |
| GET         | `/reportes/{id}`     | Obtener un reporte específico por ID.                        |
| PUT         | `/reportes/{id}`     | Actualizar un reporte específico por ID.                     |
| DELETE      | `/reportes/{id}`     | Eliminar un reporte específico por ID.                       |




## Formato de Respuesta

Todas las respuestas seguirán un formato estándar:

```json
{
    "status": "status code", // https://http.cat/
    "message": "Mensaje opcional",
    "data": { /* Datos solicitados */ } // Si se obtienen más de un dato, la representación será de la forma [{...}], mientras que si es solo uno, será de la forma {}.
    
}
```

En caso de error:

```json
{
    "status":"status code", // https://http.cat/
    "message": "Descripción del error"
}
```

## Formato de documentación

**Nota:** El repositorio debe contener un archivo **README.md** que incluya la documentación detallada de cada API, junto con las instrucciones para instalar las dependencias del proyecto. Además, es necesario especificar la versión de **NodeJS** utilizada. Si el proyecto está desarrollado con **Spring Boot** en Java, se debe indicar que requiere al menos **JDK 17**, así como listar las dependencias utilizadas con sus versiones.

### Ejemplo de la documentación de las API.

## Guardar usuario

**Method** : `GET, POST, PUT, DELETE`

**URL** : `http://localhost:300/usuarios`

**Auth required** : `True`

**header**: 

```json
{
    "Content-Type": "application/json",
    "Authorization": "Bearer ...."
}
```
**params** : `/Miguel/Castro/15` 

**URL query** : `?nombre="Miguel"&apellido="Castro"&edad=15 `

**body** : 

```json
{
    "nombre": "Miguel",
    "apellido": "Castro",
    "edad": 15
}
```

**Success Responses**

**Code** : `200 OK, 201 Created ...  `

```json
{
    "status": "status code", // https://http.cat/
    "message": "Mensaje opcional",
    "data": { /* Datos solicitados */ } // Si se obtienen más de un dato, la representación será de la forma [{...}], mientras que si es solo uno, será de la forma {}.
    
}
```

------

**Error** : ` 404 Not Found, 500 Internal Server Error ....  `

```json
{
    "status":"status code", // https://http.cat/
    "message": "Descripción del error"
}
```

------

