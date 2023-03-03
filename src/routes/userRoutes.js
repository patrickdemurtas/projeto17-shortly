import { Router } from "express";
import { signIn, signUp } from "../controllers/userControllers.js";
import { signUpValidation, singInValidation } from "../middlewares/authUserValid.js";

const userRouter = Router();


userRouter.post('/signup', signUpValidation, signUp );

userRouter.post('/signin', singInValidation, signIn);

export default userRouter;
