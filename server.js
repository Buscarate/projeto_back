import express from 'express';
import mongoose from 'mongoose';
import workRoutes from "./routes/workRoutes.js";
import postsRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect(process.env.URI_MONGO);
app.use(express.json());
app.use("/api", postsRoutes);
app.use("/api", workRoutes);
app.use("/api", authRoutes);
app.use("/api", categorieRoutes);


app.listen(3000, () => {
    console.log("Servidor Rodando!");
});
