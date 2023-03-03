import { signInSchema, signUpSchema } from "../schemas/userSchema.js";
import db from "../database/database.connection.js";
import bcrypt from "bcrypt";





export async function authRoutesValidation(req, res, next) {

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send("unauthorized!")

    try {

        const check = await db.query('SELECT * FROM users WHERE token = $1', [token]);
        if (!check.rows[0]) return res.status(401).send("unauthorized!");

        res.locals.token = token;

    } catch (error) {
        res.status(500).send('server problem!');
    }
    
    next();
}

export async function signUpValidation(req, res, next) {

    const user = req.body;

    const { error } = signUpSchema.validate(user, { abortEarly: false });

    if (error) {
        const errorsMessage = error.details.map((dt) => dt.message);
        return res.status(422).send(errorsMessage);
    }

    try {

        const checkEmail = await db.query('SELECT * FROM users WHERE email = $1', [user.email]);

        if (checkEmail.rows.length > 0) return res.sendStatus(409);

        res.locals.user = user;

    } catch (error) {

        return res.status(500).send('server problem!')
    }

    next();
}


export async function singInValidation(req, res, next) {

    const user = req.body;


    const { error } = signInSchema.validate(user, { abortEarly: false });

    if (error) {
        const errorsMessage = error.details.map((dt) => dt.message);
        return res.status(422).send(errorsMessage);
    }

    try {

        const checkEmail = await db.query('SELECT * FROM users WHERE email = $1', [user.email]);


        if (!checkEmail.rows[0] || !bcrypt.compareSync(user.password, checkEmail.rows[0].password)) return res.sendStatus(401);

        res.locals.user = user;

    } catch (error) {

        res.status(500).send("server problem!");

    }

    next();
}