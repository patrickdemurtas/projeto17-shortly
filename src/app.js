import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import urlRouter from "./routes/urlRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter)
app.use(urlRouter)

app.listen(process.env.PORT, () => {console.log(`server rolling on PORT: ${process.env.PORT}`)});
