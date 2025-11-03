/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         plate:
 *           type: string
 *           description: Placa del vehículo
 *           example: "ABC123"
 *         vehicleType:
 *           type: string
 *           description: Tipo de vehículo (Carro o Moto)
 *           example: "Carro"
 *         entryTime:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de entrada del vehículo
 *         exitTime:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de salida del vehículo
 *         status:
 *           type: string
 *           description: Estado del vehículo (active o inactive)
 *           example: "active"
 *         totalTime:
 *           type: integer
 *           description: Tiempo total de parqueo en horas
 *           example: 5
 *         ownerCedula:
 *           type: integer
 *           description: Cédula del dueño del vehículo
 *           example: 123456789
 *     VehicleEntry:
 *       type: object
 *       required:
 *         - plate
 *         - vehicleType
 *       properties:
 *         plate:
 *           type: string
 *           description: Placa del vehículo.
 *           example: "ABC123"
 *         vehicleType:
 *           type: string
 *           description: Tipo de vehículo.
 *           enum: [Carro, Moto]
 *         Cedula:
 *           type: integer
 *           description: Cédula del dueño (opcional).
 *           example: 123456789
 *         Nombre:
 *           type: string
 *           description: Nombre del dueño (opcional).
 *           example: "Juan Perez"
 */

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Listar todos los vehículos
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene una lista de todos los vehículos registrados, con la opción de filtrar por estado (activo o inactivo) y/o por tipo de vehículo (Carro o Moto).
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filtrar vehículos por estado.
 *       - in: query
 *         name: vehicleType
 *         schema:
 *           type: string
 *           enum: [Carro, Moto]
 *         description: Filtrar vehículos por tipo.
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */

/**
 * @swagger
 * /api/vehicles/stats:
 *   get:
 *     summary: Obtener estadísticas de vehículos
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene estadísticas sobre el número de vehículos, activos, inactivos, motos y carros.
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas correctamente.
 */

/**
 * @swagger
 * /api/vehicles/hours:
 *   get:
 *     summary: Obtener horas de parqueo de todos los vehículos
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene una lista de todos los vehículos con su tiempo total de parqueo.
 *     responses:
 *       200:
 *         description: Lista de horas de parqueo obtenida correctamente.
 */

/**
 * @swagger
 * /api/vehicles/hours/total:
 *   get:
 *     summary: Obtener el total de horas de parqueo
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene la suma total de horas de parqueo de todos los vehículos.
 *     responses:
 *       200:
 *         description: Total de horas de parqueo obtenido correctamente.
 */

/**
 * @swagger
 * /api/vehicles/{plate}:
 *   get:
 *     summary: Obtener un vehículo por placa
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene los detalles de un vehículo específico a partir de su placa.
 *     parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         schema:
 *           type: string
 *         description: Placa del vehículo.
 *     responses:
 *       200:
 *         description: Vehículo obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehículo no encontrado.
 */

/**
 * @swagger
 * /api/vehicles/{plate}/hours:
 *   get:
 *     summary: Obtener las horas de parqueo de un vehículo
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene el tiempo total de parqueo de un vehículo específico.
 *     parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         schema:
 *           type: string
 *         description: Placa del vehículo.
 *     responses:
 *       200:
 *         description: Horas de parqueo obtenidas correctamente.
 */

/**
 * @swagger
 * /api/vehicles/{plate}/exit:
 *   put:
 *     summary: Registrar la salida de un vehículo
 *     security:
 *       - bearerAuth: []
 *     description: Registra la hora de salida de un vehículo y lo marca como inactivo.
 *     parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         schema:
 *           type: string
 *         description: Placa del vehículo.
 *     responses:
 *       200:
 *         description: Salida registrada correctamente.
 *       404:
 *         description: Vehículo no encontrado.
 */

/**
 * @swagger
 * /api/vehicles/{plate}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     security:
 *       - bearerAuth: []
 *     description: Elimina el registro de un vehículo de la base de datos.
 *     parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         schema:
 *           type: string
 *         description: Placa del vehículo.
 *     responses:
 *       200:
 *         description: Vehículo eliminado correctamente.
 *       404:
 *         description: Vehículo no encontrado.
 */

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Registrar la entrada de un vehículo
 *     security:
 *       - bearerAuth: []
 *     description: Registra un nuevo vehículo en el parqueadero.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleEntry'
 *     responses:
 *       201:
 *         description: Vehículo registrado correctamente.
 *       400:
 *         description: Datos de entrada inválidos.
 */

/**
 * @swagger
 * /api/vehicles/owner/{Cedula}:
 *   get:
 *     summary: Obtener vehículos por cédula de dueño
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene una lista de todos los vehículos que pertenecen a un dueño específico.
 *     parameters:
 *       - in: path
 *         name: Cedula
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cédula del dueño.
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida correctamente.
 */
