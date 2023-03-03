import db from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';


export async function signUp(req, res) {

    const registerUser = res.locals.user;

    const passwordHash = bcrypt.hashSync(registerUser.password, 10);

    try {

        await db.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3)', [registerUser.name, registerUser.email, passwordHash]);

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

        await db.query('UPDATE users SET token = $1 WHERE email = $2', [token, userIn.email]);

        return res.status(200).send(body);

    } catch (error) {
      
       return res.status(500).send('server problem!');

    }
}


export async function getUserInfo(req, res) {

   let visits = 0;
   let shortUrls = [];

   const token = res.locals.token;

   try {
     
    const userInfo = await db.query('SELECT id, name FROM users WHERE token = $1', [token]);

    const urlsInfo = await db.query('SELECT * FROM urls WHERE "userId" = $1', [userInfo.rows[0].id]);

    for (let z = 0; z < urlsInfo.rows.length; z++){
        let aux = {id: urlsInfo.rows[z].id, shortUrl: urlsInfo.rows[z].shortenedUrl, url: urlsInfo.rows[z].url, visitCount: urlsInfo.rows[z].visitCount};
        visits = visits + urlsInfo.rows[z].visitCount;
        shortUrls.push(aux);
    }
     
    const body = { id: userInfo.rows[0].id, name: userInfo.rows[0].name, visitCount: visits, shortenedUrls: shortUrls };
    return res.status(200).send(body);
     
   } catch (error) {
    
    return res.status(500).send('server problem!');

   }

}