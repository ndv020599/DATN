var mysql = require("mysql");

const MYSQL_DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library_management_system",
});

module.exports = { MYSQL_DB };
