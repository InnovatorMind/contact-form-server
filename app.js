import express from "express";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin:  process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(express.json());

// Our main route
app.use("/api", formRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);


// start server ONLY after DB connects
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
