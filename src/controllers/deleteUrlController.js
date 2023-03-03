import db from "../database/database.connection.js";

export async function deleteUrlById(req, res) {

    const { id } = req.params;

    try {
        
      await db.query('DELETE FROM urls WHERE id = $1', [id]);

      return res.sendStatus(204);

    } catch (error) {

        return res.status(500).send('server problem!');
        
    }
}