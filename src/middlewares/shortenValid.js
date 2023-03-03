import db from "../database/database.connection.js";
import { shortenedUrlSchema } from "../schemas/shortenSchema.js";





export async function shortenedUrlValidation(req, res, next) {

    const { url } = req.body;


    const { error } = shortenedUrlSchema.validate(url, { abortEarly: false });

    if (error) {
        const errorsMessage = error.details.map((dt) => dt.message);
        return res.status(422).send(errorsMessage);
    }

    

    next();
}