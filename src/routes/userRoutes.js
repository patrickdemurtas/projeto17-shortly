import { Router } from "express";
import { getUserInfo, signIn, signUp } from "../controllers/userControllers.js";
import { authRoutesValidation, signUpValidation, singInValidation } from "../middlewares/authUserValid.js";

const userRouter = Router();


userRouter.post('/signup', signUpValidation, signUp );

userRouter.post('/signin', singInValidation, signIn);

userRouter.get('/users/me', authRoutesValidation, getUserInfo);

export default userRouter;
