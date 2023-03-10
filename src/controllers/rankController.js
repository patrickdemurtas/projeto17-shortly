import db from "../database/database.connection.js";

export async function rankingLastTen(req, res) {

try {

    const lastTen = await db.query(`

      SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
      FROM users 
      JOIN urls ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10; 
`);

return res.status(200).send(lastTen.rows)
    
} catch (error) {
    
return res.status(500).send('server problem!');

}

}