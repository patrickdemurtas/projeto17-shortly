import db from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenedUrl(req, res) {
  
  const { url } = req.body;
  const shortUrl = nanoid(10);

  const token = res.locals.token;

  try {
    
    let id = await db.query('SELECT MAX(id) FROM urls');
    id = id.rows[0].max +1;
    let user_id = await db.query('SELECT id FROM users WHERE token = $1',[token]);
    user_id = user_id.rows[0].id;
    await db.query('INSERT INTO urls ("userId", url, "shortenedUrl") VALUES ($1,$2,$3)', [user_id, url, shortUrl]);

    const body = { id, shortUrl };
    return res.status(201).send(body);


  } catch (error) {
    return res.status(500).send('server problem!');
  }

   
}