import db from "../database/database.connection.js";

export async function redirectToUrl(req, res) {

    const { shortUrl } = req.params;

    try {
        
        let urlChosen = await db.query('SELECT * FROM urls WHERE "shortenedUrl" = $1', [shortUrl]);

        if (urlChosen.rows.length === 0) return res.sendStatus(404);

        await db.query('UPDATE urls SET "visitCount" = $1 WHERE "shortenedUrl" = $2', [urlChosen.rows[0].visitCount+1,shortUrl]);
        
        return res.redirect(urlChosen.rows[0].url);

    } catch (error) {
        
       return res.status(500).send('server problem!');

    }

}