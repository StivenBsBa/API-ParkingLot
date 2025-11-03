/**
 * @swagger
 * /api/vehicles/list:
 *   get:
 *     description: Obtener todos los vehículos registrados, o solo los vehículos activos o inactivos, según el parámetro 'status'.
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: El estado de los vehículos a listar (activo o inactivo). Si no se proporciona, se listan todos los vehículos.
 *     responses:
 *       200:
 *         description: Lista de vehículos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   plate:
 *                     type: string
 *                     description: Placa del vehículo
 *                   vehicleType:
 *                     type: string
 *                     description: Tipo de vehículo
 *                   status:
 *                     type: string
 *                     description: Estado del vehículo (activo o inactivo)
 *       400:
 *         description: Parámetro 'status' inválido
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/vehicles/oneVehicles/{plate}:
 *   get:
 *     description: Obtener un vehículo específico por su placa
 *     parameters:
 *       - name: plate
 *         in: path
 *         required: true
 *         description: Placa del vehículo a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehicles/onecedula/{Cedula}:
 *   get:
 *     description: Obtener vehículos específico por la cedula
 *     parameters:
 *       - name: Cedula
 *         in: path
 *         required: true
 *         description: Cedula del Dueño a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dueño encontrado
 *       404:
 *         description: Dueño no encontrado
 */

/**
 * @swagger
 * /api/vehicles/vehicle-hours/{plate}:
 *   get:
 *     description: Obtener el tiempo total de parqueo de un vehículo específico
 *     parameters:
 *       - name: plate
 *         in: path
 *         required: true
 *         description: Placa del vehículo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tiempo total de parqueo en horas
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehicles/all-vehicles-hours:
 *   get:
 *     description: Obtener el tiempo total acumulado de todos los vehículos
 *     responses:
 *       200:
 *         description: Tiempo total acumulado de parqueo de todos los vehículos
 */

/**
 * @swagger
 * /api/vehicles/total-hours:
 *   get:
 *     description: Obtener el tiempo total de parqueo en el sistema
 *     responses:
 *       200:
 *         description: Tiempo total de parqueo en horas
 */

/**
 * @swagger
 * /api/vehicles/stats:
 *   get:
 *     description: Obtener las estadísticas de los vehículos en el parqueadero, incluyendo el total de vehículos, activos, inactivos, motos y carros.
 *     responses:
 *       200:
 *         description: Se obtienen correctamente las estadísticas de los vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Estadísticas de vehículos obtenidas correctamente."
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalVehiculos:
 *                       type: integer
 *                       example: 120
 *                     totalVehiculosActivos:
 *                       type: integer
 *                       example: 80
 *                     totalVehiculosInactivos:
 *                       type: integer
 *                       example: 40
 *                     totalMotosActivas:
 *                       type: integer
 *                       example: 50
 *                     totalMotosInactivas:
 *                       type: integer
 *                       example: 30
 *                     totalCarrosActivos:
 *                       type: integer
 *                       example: 70
 *                     totalCarrosInactivos:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Error al obtener las estadísticas de los vehículos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener las estadísticas de los vehículos. Intente nuevamente."
 */

/**
 * @swagger
 * /api/vehicles/vehicleEntry:
 *   post:
 *     description: Registrar un nuevo vehículo en el parqueadero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plate:
 *                 type: string
 *                 description: Placa del vehículo
 *               vehicleType:
 *                 type: string
 *                 description: Tipo de vehículo
 *     responses:
 *       201:
 *         description: Vehículo registrado exitosamente
 */

/**
 * @swagger
 * /api/vehicles/reenter/{plate}:
 *   put:
 *     description: Permite que un vehículo vuelva a entrar al parqueadero
 *     parameters:
 *       - name: plate
 *         in: path
 *         required: true
 *         description: Placa del vehículo a reingresar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo reingresado exitosamente
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehicles/exit/{plate}:
 *   put:
 *     description: Registrar la salida de un vehículo del parqueadero
 *     parameters:
 *       - name: plate
 *         in: path
 *         required: true
 *         description: Placa del vehículo a registrar la salida
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo salió del parqueadero
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehicles/delete/{plate}:
 *   delete:
 *     description: Eliminar un vehículo del parqueadero por su placa
 *     parameters:
 *       - name: plate
 *         in: path
 *         required: true
 *         description: Placa del vehículo a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo eliminado correctamente
 *       404:
 *         description: Vehículo no encontrado
 */
