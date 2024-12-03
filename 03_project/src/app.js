import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // extended is true to keep objects inside the objects
app.use(express.static("public"));

//importing router codes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export { app };
