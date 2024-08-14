const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectTimeout: 990000, // Default to 10 seconds

});
connection.getConnection()
  .then(conn => {
    console.log("Connected to the database successfully!");
    conn.release();
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_USER:', process.env.DATABASE_USER);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);

export default connection;