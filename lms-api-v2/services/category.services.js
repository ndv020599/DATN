require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { MYSQL_DB } = require("../mysql.config");

module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  searchCategory,
};

function createCategory(req, res) {
  const name = req.body.name;
  const description = req.body.description;

  MYSQL_DB.connect((err) => {
    let sql = `INSERT INTO genre(name, description) VALUES("${name}", "${description}")`;
    MYSQL_DB.query(sql, (err, results) => {
      if (err) {
        res.send({
          code: 201,
          message: "Thao tác không thành công",
        });
      } else {
        res.send({
          code: 200,
          message: "Thao tác thành công",
        });
      }
    });
  });
}

function editCategory(req, res) {
  const genre_id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;

  MYSQL_DB.connect((err) => {
    let sql = `
        UPDATE genre
        SET name = "${name}", description = "${description}"
        WHERE genre_id = ${genre_id}
        `;
    MYSQL_DB.query(sql, (err, results) => {
      if (err) {
        res.send({
          code: 201,
          message: "Thao tác không thành công",
        });
      } else {
        res.send({
          code: 200,
          message: "Thao tác thành công",
        });
      }
    });
  });
}

function deleteCategory(req, res) {
  const genre_id = req.params.id;

  MYSQL_DB.connect((err) => {
    let sql = `DELETE FROM genre WHERE genre_id = ${genre_id}`;
    MYSQL_DB.query(sql, (err, results) => {
      if (err) {
        res.send({
          code: 201,
          message: "Thao tác không thành công",
        });
      } else {
        res.send({
          code: 200,
          message: "Thao tác thành công",
        });
      }
    });
  });
}

function searchCategory(req, res) {
  const key = req.body.key;
  MYSQL_DB.connect((err) => {
    if (key === "" || key === undefined) {
      let sql = "SELECT * FROM genre";
      MYSQL_DB.query(sql, (err, results) => {
        console.log(err);
        if (err) {
          res.send({
            code: 201,
            message: "Thao tác không thành công",
          });
        } else {
          res.send({
            code: 200,
            message: "Thao tác thành công",
            data: results,
          });
        }
      });
    } else {
      let sql = `SELECT * FROM genre WHERE genre.name LIKE "%${key}%"`;
      MYSQL_DB.query(sql, (err, results) => {
        if (err) {
          res.send({
            code: 201,
            message: "Thao tác không thành công",
          });
        } else {
          res.send({
            code: 200,
            message: "Thao tác thành công",
            data: results,
          });
        }
      });
    }
  });
}
