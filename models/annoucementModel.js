const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Diyasha@6432',
  database: 'imerit_plus',
});

async function getAllAnnouncements() {
  const [rows] = await pool.query('SELECT * FROM announcement');
  return rows;
}

module.exports = { getAllAnnouncements };