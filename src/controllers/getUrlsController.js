import db from "../database/database.connection.js";

export async function getUrlsById(req, res) {

    const { id } = req.params;

    try {

        const query = await db.query('SELECT id, url, "shortenedUrl" FROM urls WHERE "id" = $1', [id]);
        if (query.rows.length === 0) return res.sendStatus(404);

        const body = {

            id: query.rows[0].id,
            shortUrl: query.rows[0].shortenedUrl,
            url: query.rows[0].url
        };

        return res.status(200).send(body);

    } catch (error) {

        return res.status(500).send('server problem!');

    }

}