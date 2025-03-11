import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", userRoutes);

export const api = onRequest(
  {
    region: "us-central1",
  },
  app
);
