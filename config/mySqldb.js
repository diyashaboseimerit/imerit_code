const mysql = require('mysql2/promise');
require('dotenv').config()
const db_iet = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
});

module.exports = db_iet;
