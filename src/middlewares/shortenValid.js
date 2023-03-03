import { shortenedUrlSchema } from "../schemas/shortenSchema.js";





export async function shortenedUrlValidation(req, res, next) {

    const requisition = req.body;


    const { error } = shortenedUrlSchema.validate(requisition, { abortEarly: false });

    if (error) {
        const errorsMessage = error.details.map((dt) => dt.message);
        return res.status(422).send(errorsMessage);
    }

    

    next();
}