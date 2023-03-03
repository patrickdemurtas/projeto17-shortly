import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter)

app.listen(process.env.PORT, () => {console.log(`server rolling on PORT: ${process.env.PORT}`)});
