import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "emilus",
  user: "root",
  password: "password",
});

export default db.promise();
