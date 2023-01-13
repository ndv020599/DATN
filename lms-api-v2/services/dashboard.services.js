require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { MYSQL_DB } = require("../mysql.config");

module.exports = {
  dashboardData,
};

function dashboardData(req, res) {
  MYSQL_DB.connect((err) => {
    let sql = `
        SELECT 
        (SELECT COUNT(books.book_id) FROM books) AS books_amount,
        (SELECT COUNT(users.user_id) FROM users) AS users_amount,
        (SELECT COUNT(books_request.request_id) FROM books_request WHERE status = 0) AS borrow_amount,
        (SELECT COUNT(books_request.request_id) FROM books_request WHERE status = 3) AS return_amount
        `;
    MYSQL_DB.query(sql, (err, results) => {
      let sql = `
      SELECT 
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW() - INTERVAL 6 DAY, '%d-%m-%Y') AND status = 1) AS day_7,
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW() - INTERVAL 5 DAY, '%d-%m-%Y') AND status = 1) AS day_6,
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW() - INTERVAL 4 DAY, '%d-%m-%Y') AND status = 1) AS day_5,
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW() - INTERVAL 3 DAY, '%d-%m-%Y') AND status = 1) AS day_4,
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW() - INTERVAL 2 DAY, '%d-%m-%Y') AND status = 1) AS day_3,
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW() - INTERVAL 1 DAY, '%d-%m-%Y') AND status = 1) AS day_2,
      (SELECT COUNT(*) FROM books_request
      WHERE borrow_date = DATE_FORMAT(NOW(), '%d-%m-%Y') AND status = 1) AS day_1
          `;
      MYSQL_DB.query(sql, (err, chartData) => {
        if (err) {
          res.send({
            code: 201,
            message: "Thao tác không thành công",
          });
        } else {
          res.send({
            code: 200,
            message: "Thao tác thành công",
            data: results[0],
            chartData: chartData[0],
          });
        }
      });
    });
  });
}
