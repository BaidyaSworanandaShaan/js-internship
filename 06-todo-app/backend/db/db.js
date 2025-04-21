const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todo-app",
});

db.connect((err) => {
  if (err) {
    console.error(err.message);
    console.error("MySQL connection failedd");
  } else {
    console.log("Connected Succefully");
  }
});

module.exports = db;
