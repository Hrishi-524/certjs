import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.send("Health check successful!");
});

import indexRouter from "./routes/index.router.js";

app.use("/api/v1", indexRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});