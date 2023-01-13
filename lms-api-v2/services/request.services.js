require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { MYSQL_DB } = require("../mysql.config");

module.exports = {
  createRequest,
  searchRequest,
  updateRequest,
  searchRequestOfAllBook,
  searchByBook,
  deleteRequest,
};

function createRequest(req, res) {
  const user_id = req.body.user_id;
  const genre_id = req.body.genre_id;
  const book_id = req.body.book_id;
  const book_code = req.body.book_code;
  const borrow_date = req.body.borrow_date;
  const return_date = req.body.return_date;

  MYSQL_DB.connect((err) => {
    let sql = `SELECT * FROM books WHERE book_code = "${book_code}" AND book_status = 0`;
    MYSQL_DB.query(sql, (err, bookList) => {
      if (bookList.length === []) {
        res.send({
          code: 201,
          message: "Số lượng sách đã hết",
        });
      } else {
        let sql = `
        SELECT *
        FROM books_request
        WHERE (user_id = ${user_id} AND book_code = "${book_code}") AND (books_request.status = 1 OR books_request.status = 3 OR books_request.status = 0)`;
        MYSQL_DB.query(sql, (err, results) => {
          console.log(results);
          if (results.length !== 0) {
            res.send({
              code: 201,
              message: "Bạn đã mượn cuốn sách này",
            });
          } else {
            let sql = `
            INSERT INTO books_request(user_id, genre_id, book_code, book_id, borrow_date, return_date)
            VALUES(${user_id}, ${genre_id}, "${book_code}", null, "${borrow_date}", "${return_date}")`;
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
          }
        });
      }
    });
  });
}

function searchRequest(req, res) {
  const status = req.body.status;
  const user_id = req.body.user_id;

  if (user_id === undefined || user_id === "") {
    MYSQL_DB.connect((err) => {
      let sql = `
          SELECT books_request.*, genre.name AS genre_name, books.title AS book_name, books.author AS book_author, books.book_code AS book_code, books.book_code_distinct AS book_code_distinct, users.name AS user_name
          FROM (((books_request
              LEFT JOIN genre ON books_request.genre_id = genre.genre_id)
              LEFT JOIN books ON books_request.book_code = books.book_code)
              LEFT JOIN users ON books_request.user_id = users.user_id)
          WHERE status = ${status}
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
            data: results,
          });
        }
      });
    });
  } else {
    MYSQL_DB.connect((err) => {
      let sql = `
        SELECT books_request.*, genre.name AS genre_name, books.title AS book_name, books.author AS book_author, books.publisher AS book_publisher, users.name AS user_name, IF(books_request.book_id is null, null, books.book_code_distinct) AS book_code_distinct
        FROM books_request
            LEFT JOIN genre ON books_request.genre_id = genre.genre_id
            LEFT JOIN books ON books_request.book_code = books.book_code 
            LEFT JOIN users ON books_request.user_id = users.user_id
        WHERE IF(books_request.book_id is null, books_request.user_id = ${user_id}, books_request.user_id = ${user_id} AND books_request.book_id = books.book_id)
        GROUP BY books_request.request_id
        `; // IF(books_request.book_id is null, null, books.book_code_distinct) AS book_code_distinct nghĩa là:
      // nếu id sách trong bảng book request là null thì là null còn không thì là mã sách riêng đặt tên mã srieng
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
    });
  }
}

function searchRequestOfAllBook(req, res) {
  const status = req.body.status;

  if (status !== null) {
    MYSQL_DB.connect((err) => {
      let sql = `
      SELECT DISTINCT books_request.book_code, books_request.status, genre.*, books.*
      FROM books_request
      LEFT JOIN genre ON books_request.genre_id = genre.genre_id
      LEFT JOIN books ON books_request.book_code = books.book_code
      WHERE books_request.status = ${status}
      GROUP BY books.book_code
      `;
      //chọn ko trùng lặp
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
    });
  } else {
    MYSQL_DB.connect((err) => {
      let sql = `
      SELECT DISTINCT books_request.book_id, books_request.status, genre.*, books.*
      FROM books_request
      INNER JOIN genre ON books_request.genre_id = genre.genre_id
      INNER JOIN books ON books_request.book_code = books.book_code
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
            data: results,
          });
        }
      });
    });
  }
}

function searchByBook(req, res) {
  const status = req.body.status;
  const book_id = req.body.book_id;
  const book_code = req.body.book_code;

  if (status !== undefined) {
    MYSQL_DB.connect((err) => {
      let sql = `
      SELECT books_request.*, genre.name AS genre_name, books.title AS book_title, books.author AS book_author, books.book_code AS book_code, users.name AS user_name, users.phone AS user_phone, users.email AS user_email, users.address AS user_address, users.user_class AS user_class, users.user_code AS user_code
      FROM books_request
      LEFT JOIN genre ON books_request.genre_id = genre.genre_id
      LEFT JOIN books ON books_request.book_code = books.book_code
      LEFT JOIN users ON books_request.user_id = users.user_id
      WHERE books_request.book_code = "${book_code}" AND books_request.status = ${status}
      GROUP BY users.user_id
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
            data: results,
          });
        }
      });
    });
  } else {
    MYSQL_DB.connect((err) => {
      let sql = `
        SELECT books_request.*, genre.name AS genre_name, books.title AS book_title, books.author AS book_author, users.name AS user_name
        FROM books_request
        LEFT JOIN genre ON books_request.genre_id = genre.genre_id
        LEFT JOIN books ON books_request.book_id = books.book_id
        LEFT JOIN users ON books_request.user_id = users.user_id
        WHERE books_request.book_code = ${book_code}
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
            data: results,
          });
        }
      });
    });
  }
}

function updateRequest(req, res) {
  const request_id = req.body.request_id;
  const status = req.body.status;
  const book_id = req.body.book_id;
  const book_code = req.body.book_code;
  const issue = req.body.issue || null;

  if (status === 1) {
    MYSQL_DB.connect((err) => {
      let sql = `SELECT * FROM books WHERE book_code = "${book_code}" AND book_status = 0`;
      MYSQL_DB.query(sql, (err, bookList) => {
        if (bookList.length === 0) {
          res.send({
            code: 201,
            message: "Số lượng sách đã hết",
          });
        } else {
          const acceptedBook = bookList[0].book_id;
          let sql = `
                UPDATE books_request
                SET status = ${status}, book_id = ${acceptedBook}
                WHERE request_id = ${request_id}
                `;
          MYSQL_DB.query(sql, (err, results) => {
            console.log(err);
            let sql = `
                    UPDATE books
                    SET book_status = 1
                    WHERE book_id = ${acceptedBook}
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
      });
    });
  }

  if (status === 4) {
    MYSQL_DB.connect((err) => {
      let sql = `
            UPDATE books_request
            SET status = ${status}
            WHERE request_id = ${request_id}
            `;
      MYSQL_DB.query(sql, (err, results) => {
        let sql = `
                UPDATE books
                SET book_status = 0
                WHERE book_id = ${book_id}
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
    });
  }

  if (status === 5 || status === 2) {
    MYSQL_DB.connect((err) => {
      let sql = `
        UPDATE books_request
        SET status = ${status}, issue = "${issue}"
        WHERE request_id = ${request_id}
      `;
      MYSQL_DB.query(sql, (err, results) => {
        if (err) {
          console.log(err);
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

  if (status === 3) {
    MYSQL_DB.connect((err) => {
      let sql = `
            UPDATE books_request
            SET status = ${status}
            WHERE request_id = ${request_id}
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
            data: results,
          });
        }
      });
    });
  }
}

function deleteRequest(req, res) {
  const id = req.params.id;

  MYSQL_DB.connect((err) => {
    let sql = `DELETE FROM books_request WHERE request_id = ${id}`;
    MYSQL_DB.query(sql, (err) => {
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
