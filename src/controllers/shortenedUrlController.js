import db from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenedUrl(req, res) {

    const { url } = req.body;

    const shortUrl = nanoid();

    try {

        const operationUrl = await db.query('INSERT INTO urls (url, "shortenedUrl") VALUES ($1,$2) RETURNING id', [url, shortUrl]);

        const id = operationUrl.rows[0].id;
        const body = { id, shortUrl };

        return res.status(201).json(body);

    } catch (error) {

        return res.status(500).send('server problem!')

    }
}