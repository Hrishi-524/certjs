import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") ?? [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.send("Health check successful!");
});

app.use("/api", indexRouter)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
