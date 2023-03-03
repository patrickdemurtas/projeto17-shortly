import Joi from "joi";

export const shortenedUrlSchema = Joi.object({
    url: Joi.string().uri().required()
})