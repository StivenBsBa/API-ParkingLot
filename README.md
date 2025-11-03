# API para el Parqueadero de Vehículos

Esta API permite registrar, listar, actualizar y eliminar vehículos en un parqueadero. Los vehículos pueden ser de tipo "Carro" o "Moto". El parqueadero tiene un límite de 5 cupos para carros y 10 para motos.

La API fue desarrollado utilizando **Node.js** y **Express** como servidor backend. La API permite gestionar vehículos, incluyendo su registro, consulta, actualización de estado, y eliminación.

## Rutas de la API

- **Ruta Base del Servidor**:  
  `http://localhost:[puerto]/api/vehicles`  
  Utiliza esta ruta base para interactuar con los endpoints de la API.

- **Documentación de la API (Swagger)**:  
  `http://localhost:[puerto]/api-docs`  
  Visita esta URL para acceder a la documentación interactiva de la API. Aquí podrás ver todos los endpoints disponibles, cómo hacer solicitudes y qué respuestas esperar.

## Endpoints

### 1. **Registrar un vehículo**

- **URL**: `/api/vehicles/vehicleEntry`
- **Método**: `POST`
- **Descripción**: Registra un vehículo en el parqueadero.
- **Body**:

  ```json
  {
    "plate": "ABC123", // Placa del vehículo
    "vehicleType": "Carro", // Tipo del vehículo ("Carro" o "Moto")
    "entryTime": "2024-12-05T10:30:00Z", // Fecha y hora de entrada
    "exitTime": null, // Fecha y hora de salida (por defecto es null al ingresar)
    "status": "active" // Estado del vehículo (activo por defecto)
  }
  ```

- **Respuestas**:
  - **201 Created**: Vehículo registrado con éxito.
  - **400 Bad Request**: La placa ya existe o los datos son inválidos.
  - **500 Internal Server Error**: Error en el servidor.

### 2. **Listar todos los vehículos**

- **URL**: `/api/vehicles/list`
- **Método**: `GET`
- **Descripción**: Obtiene todos los vehículos registrados en el parqueadero.
- **Respuestas**:
  - **200 OK**: Lista de vehículos registrados.
  - **500 Internal Server Error**: Error al obtener los vehículos.

### 3. **Listar vehículos activos**

- **URL**: `/api/vehicles/list?status=active`
- **Método**: `GET`
- **Descripción**: Obtiene todos los vehículos activos (aquellos que aún no han salido).
- **Respuestas**:
  - **200 OK**: Lista de vehículos activos.
  - **500 Internal Server Error**: Error al obtener los vehículos activos.

### 4. **Listar vehículos inactivos**

- **URL**: `/api/vehicles/list?status=inactive`
- **Método**: `GET`
- **Descripción**: Obtiene todos los vehículos inactivos (aquellos que ya han salido).
- **Respuestas**:
  - **200 OK**: Lista de vehículos inactivos.
  - **500 Internal Server Error**: Error al obtener los vehículos inactivos.

### 5. **Obtener un vehículo por placa**

- **URL**: `/api/vehicles/oneVehicles/:plate`
- **Método**: `GET`
- **Descripción**: Obtiene un vehículo específico por su placa.
- **Parámetros de URL**:
  - `plate`: La placa del vehículo a buscar.
- **Respuestas**:
  - **200 OK**: Información del vehículo.
  - **404 Not Found**: Vehículo no encontrado.
  - **500 Internal Server Error**: Error al obtener el vehículo.

### 6. **Obtener horas de parqueo de un vehículo por placa**

- **URL**: `/api/vehicles/vehicle-hours/:plate`
- **Método**: `GET`
- **Descripción**: Obtiene las horas de parqueo de un vehículo específico por su placa.
- **Parámetros de URL**:
  - `plate`: La placa del vehículo a consultar.
- **Respuestas**:
  - **200 OK**: Total de horas de parqueo del vehículo.
  - **404 Not Found**: Vehículo no encontrado.
  - **500 Internal Server Error**: Error al obtener las horas de parqueo.

### 7. **Obtener las horas de parqueo de todos los vehículos**

- **URL**: `/api/vehicles/all-vehicles-hours`
- **Método**: `GET`
- **Descripción**: Obtiene las horas de parqueo de todos los vehículos registrados.
- **Respuestas**:
  - **200 OK**: Total de horas de parqueo de todos los vehículos.
  - **500 Internal Server Error**: Error al obtener las horas de parqueo.

### 8. **Obtener el total de horas de parqueo en el parqueadero**

- **URL**: `/api/vehicles/total-hours`
- **Método**: `GET`
- **Descripción**: Obtiene el total de horas de parqueo de todos los vehículos en el parqueadero.
- **Respuestas**:
  - **200 OK**: Total de horas de parqueo en el parqueadero.
  - **500 Internal Server Error**: Error al calcular el total de horas.

### 9. **Obtener las estadísticas de los vehículos**

- **URL**: `/api/vehicles/stats`
- **Método**: `GET`
- **Descripción**: Obtiene las estadísticas de los vehículos en el parqueadero, incluyendo el total de vehículos, vehículos activos, vehículos inactivos, motos activas, motos inactivas, carros activos y carros inactivos.
- **Respuestas**:
  - **200 OK**: Se obtienen correctamente las estadísticas de los vehículos.
  - **500 Internal Server Error**: Si ocurre un error al obtener las estadísticas de los vehículos.

### 10. **Actualizar el estado de salida de un vehículo**

- **URL**: `/api/vehicles/exit/:plate`
- **Método**: `PUT`
- **Descripción**: Actualiza la hora de salida y cambia el estado de un vehículo a "inactivo".
- **Parámetros de URL**:
  - `plate`: La placa del vehículo cuyo estado se actualizará.
- **Respuestas**:
  - **200 OK**: El vehículo ha sido marcado como inactivo y se ha actualizado la hora de salida.
  - **400 Bad Request**: El vehículo ya ha salido o está inactivo.
  - **404 Not Found**: Vehículo no encontrado.
  - **500 Internal Server Error**: Error al actualizar el estado.

### 11. **Registrar la reentrada de un vehículo**

- **URL**: `/api/vehicles/reenter/:plate`
- **Método**: `PUT`
- **Descripción**: Registra la reentrada de un vehículo al parqueadero, actualizando su estado a "activo" y asignando una nueva hora de entrada.
- **Parámetros de URL**:
  - `plate`: La placa del vehículo que regresa al parqueadero.
- **Respuestas**:
  - **200 OK**: El vehículo ha sido registrado de nuevo como activo y se ha actualizado su hora de entrada.
  - **400 Bad Request**: El vehículo ya está activo.
  - **404 Not Found**: Vehículo no encontrado.
  - **500 Internal Server Error**: Error al procesar la reentrada del vehículo.

### 12. **Eliminar un vehículo**

- **URL**: `/api/vehicles/delete/:plate`
- **Método**: `DELETE`
- **Descripción**: Elimina un vehículo del registro.
- **Parámetros de URL**:
  - `plate`: La placa del vehículo a eliminar.
- **Respuestas**:
  - **200 OK**: Vehículo eliminado con éxito..
  - **404 Not Found**: Vehículo no encontrado.
  - **500 Internal Server Error**: Error al eliminar el vehículo.

## Estructura de la Base de Datos

La base de datos utiliza Mongoose para gestionar los documentos de los vehículos. Cada vehículo tiene los siguientes campos:

- `plate`: Placa del vehículo (String, único y obligatorio).
- `vehicleType`: Tipo de vehículo ("Carro" o "Moto", obligatorio).
- `entryTime`: Hora de entrada del vehículo (Date, por defecto `Date.now()`).
- `exitTime`: Hora de salida del vehículo (Date, por defecto `null`).
- `status`: Estado del vehículo ("active" o "inactive", por defecto "active").

### Cálculo de Tiempo en el Parqueadero

Al registrar la salida de un vehículo, se calcula el tiempo total de permanencia en el parqueadero en horas. Este cálculo incluye el tiempo transcurrido desde su última entrada, que se suma al tiempo acumulado previamente. De esta manera, se lleva un registro acumulativo del total de horas que el vehículo ha estado en el parqueadero. En caso de que el tiempo de permanencia sea inferior a una hora, se redondea al alza, cobrando como si hubiera permanecido una hora completa.
