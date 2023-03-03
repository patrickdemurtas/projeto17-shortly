import db from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';


export async function signUp(req, res) {

    const registerUser = res.locals.user;

    const passwordHash = bcrypt.hashSync(registerUser.password, 10);

    try {

        await db.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3)', [registerUser.name, registerUser.email, registerUser.password]);

        return res.sendStatus(201);

    } catch (error) {

        return res.status(500).send('server problem!');

    }

}

export async function signIn(req, res) {

    const userIn = res.locals.user;

    const token = uuidV4();

    const body = { token: token };

    try {

        const operation = await db.query('UPDATE users SET "token" = $1 WHERE "email" = $2', [token, userIn.email]);

        return res.status(200).send(body);

    } catch (error) {
      
       return res.status(500).send('server problem!');

    }
}