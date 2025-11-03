/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
 *       type: object
 *       properties:
 *         Cedula:
 *           type: integer
 *           description: Cédula del dueño
 *           example: 123456789
 *         Nombre:
 *           type: string
 *           description: Nombre del dueño
 *           example: "Juan Perez"
 */

/**
 * @swagger
 * /api/owners:
 *   get:
 *     summary: Listar todos los dueños
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene una lista de todos los dueños registrados.
 *     responses:
 *       200:
 *         description: Lista de dueños obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 */
