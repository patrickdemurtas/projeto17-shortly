import { Router } from "express";
import { rankingLastTen } from "../controllers/rankController.js";
import { getUserInfo, signIn, signUp } from "../controllers/userControllers.js";
import { authRoutesValidation, signUpValidation, singInValidation } from "../middlewares/authUserValid.js";

const userRouter = Router();


userRouter.post('/signup', signUpValidation, signUp );
userRouter.post('/signin', singInValidation, signIn);

userRouter.get('/users/me', authRoutesValidation, getUserInfo);
userRouter.get('/ranking', rankingLastTen);

export default userRouter;
