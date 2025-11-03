/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario del administrador
 *           example: "admin"
 *         password:
 *           type: string
 *           description: Contraseña del administrador
 *           example: "password123"
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo administrador
 *     description: Crea un nuevo usuario administrador en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: Administrador creado correctamente.
 *       400:
 *         description: El usuario administrador ya existe.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     description: Autentica a un administrador y devuelve un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación.
 *       401:
 *         description: Credenciales inválidas.
 */
