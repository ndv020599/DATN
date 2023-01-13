require("dotenv").config();
const { MYSQL_DB } = require("../mysql.config");

module.exports = {
  createBook,
  editBook,
  deleteBook,
  searchBook,
  searchBookByCode,
};

function createBook(req, res) {
  const book_code = req.body.book_code;
  const book_code_distinct = req.body.book_code_distinct;
  const genre_id = req.body.genre_id;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const edition = req.body.edition || null;
  const isbn = req.body.isbn || null;
  const pages = req.body.pages || null;

  if (
    genre_id === undefined ||
    title === undefined ||
    author === undefined ||
    publisher === undefined ||
    book_code === undefined ||
    book_code_distinct === undefined
  ) {
    res.send({
      code: 201,
      message: "Vui lòng nhập đủ thông tin",
    });
  } else {
    MYSQL_DB.connect((err) => {
      let sql = `SELECT * FROM books WHERE book_code_distinct = "${book_code_distinct}"`;
      MYSQL_DB.query(sql, (err, result) => {
        if (result.length === 0) {
          let sql = `
                INSERT INTO books(book_code, book_code_distinct, genre_id, title, author, publisher, edition, isbn, pages)
                VALUES ("${book_code}", "${book_code_distinct}", ${genre_id}, "${title}", "${author}", "${publisher}", ${edition}, "${isbn}", ${pages})
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
        } else {
          res.send({
            code: 201,
            message: "Mã sách đã tồn tại",
          });
        }
      });
    });
  }
}

function editBook(req, res) {
  const id = req.params.id;
  const book_code = req.body.book_code;
  const book_code_distinct = req.body.book_code_distinct;
  const genre_id = req.body.genre_id;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const edition = req.body.edition || null;
  const isbn = req.body.isbn || null;
  const pages = req.body.pages || null;

  if (
    genre_id === undefined ||
    title === undefined ||
    author === undefined ||
    publisher === undefined ||
    book_code === undefined ||
    book_code_distinct === undefined
  ) {
    res.send({
      code: 201,
      message: "Vui lòng nhập đủ thông tin",
    });
  } else {
    MYSQL_DB.connect((err) => {
      if (book_code !== null) {
        // sửa thông tin tất cả sách
        let sql = `
            UPDATE books
            SET genre_id = ${genre_id}, title = "${title}", author = "${author}", publisher = "${publisher}", edition = ${edition}, isbn = "${isbn}", pages = ${pages}
            WHERE book_code = "${book_code}"
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
      }

      if (book_code === null) {
        // sửa thông tin 1 cuốn sách
        let sql = `SELECT * FROM books WHERE book_code_distinct = "${book_code_distinct}"`;
        MYSQL_DB.query(sql, (err, results) => {
          const book_id = results[0]?.book_id;
          if (results.length === 0 || book_id == id) {
            // mã sách chưa tồn tại hoặc id sách ở param trùng id sách được tìm thấy bởi câu lệnh sql
            let sql = `
            UPDATE books
            SET genre_id = ${genre_id}, title = "${title}", author = "${author}", publisher = "${publisher}", edition = ${edition}, isbn = "${isbn}", pages = ${pages}, book_code_distinct = "${book_code_distinct}"
            WHERE book_id = ${id}
            `;
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
                });
              }
            });
          } else {
            res.send({
              code: 201,
              message: "Mã sách này đã tồn tại",
            });
          }
        });
      }
    });
  }
}

function deleteBook(req, res) {
  const id = req.params.id;

  const regex = new RegExp("^[0-9]*$");

  MYSQL_DB.connect((err) => {
    if (regex.test(id)) {
      //kiểm tra id là số xóa từng quyển
      let sql = `DELETE FROM books WHERE book_id = ${id}`;
      MYSQL_DB.query(sql, (err, results) => {
        console.log(results);

        if (err) {
          res.send({
            code: 201,
            message: "Thao tác không thành công",
          });
        } else {
          if (results.affectedRows === 0) {
            res.send({
              code: 202,
              message: "Id khong ton tai",
            });
          } else {
            res.send({
              code: 200,
              message: "Thao tác thành công",
            });
          }
        }
      });
    } else {
      let sql = `DELETE FROM books WHERE book_code = "${id}"`;
      MYSQL_DB.query(sql, (err, results) => {
        if (err) {
          res.send({
            code: 201,
            message: "Thao tác không thành công",
          });
        } else {
          // console.log(results);
          if (results.affectedRows === 0) {
            res.send({
              code: 202,
              message: "Id khong ton tai",
              type: typeof id,
            });
          } else {
            res.send({
              code: 200,
              message: "Thao tác thành công",
            });
          }
        }
      });
    }
  });
}

function searchBook(req, res) {
  const key = req.body.key;

  MYSQL_DB.connect((err) => {
    if (key === "" || key === undefined) {
      // let sql = `
      // SELECT books.*, genre.name AS genre_name
      // FROM books
      // INNER JOIN genre
      // ON books.genre_id = genre.genre_id`;
      let sql = `
        SELECT *, genre.name AS genre_name, SUM(books.book_status = 0) AS quantity
        FROM books
        INNER JOIN genre ON books.genre_id = genre.genre_id
        GROUP BY books.book_code
      `; //chọn tất cả book từ bảng book, chọn cột name từ bảng thể loại và đặt tên là genre_name
      // inner join: gộp chung với bảng thể loại điều kiện id thể loại trong bảng book trùng id thể loại trong  bảng thể loại
      //sum: tính tổng sách có status = 0 đặt tên là quantity
      // group by: gộp các quyển sách có trùng mã sách chung
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
    } else {
      let sql = `
      SELECT books.*, COUNT(book_code) AS book_quantity, genre.name AS genre_name
      FROM books
      LEFT JOIN genre ON books.genre_id = genre.genre_id
      GROUP BY books.book_code
      WHERE concat(title, author, publisher, genre.name)
      LIKE "%${key}%"
      `;
      //chọn tất cả từ bảng sách tính tổng mã sách chung đặt tên book-quantity, lấy cột name từ bảng thể loại đặt tên genre_name
      //left join: giữ phần tử bên trái điều kiện id_thể loại ở bảng book = Id thể laoij ở bảng thẻ laoij
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

function searchBookByCode(req, res) {
  const book_code = req.body.book_code;
  console.log(book_code);

  MYSQL_DB.connect((err) => {
    let sql = `SELECT * FROM books WHERE book_code = '${book_code}'`;
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
