import db from "../database/database.connection.js";
import { shortenedUrlSchema } from "../schemas/shortenSchema.js";





export async function shortenedUrlValidation(req, res, next) {

    const url = req.body;

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");


    const { error } = shortenedUrlSchema.validate(url, { abortEarly: false });

    if (error) {
        const errorsMessage = error.details.map((dt) => dt.message);
        return res.status(422).send(errorsMessage);
    }

    res.locals.token = token;

    next();
}