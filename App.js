import express from "express";
import cors from "cors";
import connectToDatabase from "./src/config/dbConnection.js";
import router from "./src/Routes/vehicleRoutes.js";
import ownerRouter from "./src/Routes/ownerRoutes.js";
import authRouter from "./src/Routes/authRoutes.js";
import { swaggerUi, swaggerDocs } from "./src/config/swaggerOptions.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectToDatabase();

// Rutas de la API
app.use("/api/auth", authRouter);
app.use("/api/vehicles", router);
app.use("/api/owners", ownerRouter);

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manejo de errores centralizado
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      "Ruta no encontrada. Consulta la documentación de la API en /api-docs.",
  });
});

// Endpoint de estado
app.get("/status", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Servidor funcionando correctamente.",
  });
});

export default app;
