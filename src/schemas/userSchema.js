import Joi from "joi";

export const signInSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});


export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});