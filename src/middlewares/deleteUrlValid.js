import db from "../database/database.connection.js";

export async function deleteUrlValidation(req, res, next) {

    const { id } = req.params;

    const token = res.locals.token;

    try {

        const urlsQuery = await db.query('SELECT * FROM urls WHERE id = $1', [id]);
         
        if (urlsQuery.rows.length === 0) return res.sendStatus(404);

        const userQuery = await db.query('SELECT * FROM users WHERE token = $1', [token]);

        if ( userQuery.rows[0].id !== urlsQuery.rows[0].userId ) return res.sendStatus(401);

    } catch (error) {

        return res.status(500).send('server problem!');
        
    }

    next();
}