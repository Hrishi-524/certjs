import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.send("Health check successful!");
});

app.use("/api", indexRouter)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
