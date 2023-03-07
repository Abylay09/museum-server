const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "spb_museum",
    password: "Ablay123456"
})

module.exports = pool;