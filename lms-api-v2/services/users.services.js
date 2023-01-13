require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { MYSQL_DB } = require("../mysql.config");
const omitPasswordHelper = require("../_helpers/omitPassword");

module.exports = {
  login,
  signup,
  changePass,
  getProfile,
  changeProfile,
  deleteProfile,
  searchProfile,
};

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  MYSQL_DB.connect((err) => {
    let sql = `
        SELECT * from users WHERE email = "${email}" AND password = "${password}" 
        `; // chọn tất cả từ bảng user điều kiện email = email và pass = pass
    MYSQL_DB.query(sql, (err, results) => {
      // query: thực thi
      if (err) {
        res.send({
          code: 201,
          message: "Đăng nhập không thành công",
        });
      } else {
        if (results.length === 0) {
          res.send({
            code: 201,
            message: "Tài khoản hoặc mật khẩu không chính xác",
          });
        } else {
          const user = results[0];
          console.log(results[0]);
          const token = jwt.sign(
            { id: user.user_id, role: user.role },
            process.env.SECRET_KEY, //mã hóa user_id và role
            { expiresIn: "1d" }
          );
          res.send({
            code: 200,
            message: "Đăng nhập thành công",
            data: {
              ...omitPassword(user),
              token,
            },
          });
        }
      }
    });
  });
}

function signup(req, res) {
  const user_code = req.body.user_code || "";
  const user_class = req.body.user_class || "";
  const user_faculty = req.body.user_faculty || "";
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const role = req.body.role;
  // console.log(req.body);

  if (role === 0 || role === 3) {
    if (user_code === "" || user_class === "" || user_faculty === "") {
      res.send({
        code: 201,
        message: "Vui lòng nhập đủ thông tin",
      });
    } else {
      MYSQL_DB.connect((err) => {
        let sql = `SELECT * FROM users WHERE user_code = "${user_code}" OR email = "${email}"`; //chọn tất cả từ bảng user điều kiện có mã độc giả hoặc email
        MYSQL_DB.query(sql, (err, results) => {
          if (results.length === 0) {
            //chưa có email hoặc mã dọc giả
            let sql = `
              INSERT INTO users(user_code, user_class, user_faculty, name, phone, email, password, address, role)
              VALUES ("${user_code}", "${user_class}", "${user_faculty}", "${name}", "${phone}", "${email}", "${password}", "${address}", ${role})
              `; //thêm các trường vào bảng users
            MYSQL_DB.query(sql, (err, results) => {
              if (err) {
                res.send({
                  code: 204,
                  message: "Đăng ký không thành công",
                });
              } else {
                res.send({
                  code: 200,
                  message: "Đăng ký thành công",
                });
              }
            });
          } else {
            res.send({
              code: 201,
              message: "Email hoặc Mã Code đã được sử dụng",
            });
          }
        });
      });
    }
  } else {
    MYSQL_DB.connect((err) => {
      let sql = `SELECT * FROM users WHERE email = "${email}"`;
      MYSQL_DB.query(sql, (err, results) => {
        if (results.length === 0) {
          let sql = `
            INSERT INTO users(user_code, user_class, user_faculty, name, phone, email, password, address, role)
            VALUES ("${user_code}", "${user_class}", "${user_faculty}", "${name}", "${phone}", "${email}", "${password}", "${address}", ${role})
            `;
          MYSQL_DB.query(sql, (err, results) => {
            if (err) {
              res.send({
                code: 204,
                message: "Đăng ký không thành công",
              });
            } else {
              res.send({
                code: 200,
                message: "Đăng ký thành công",
              });
            }
          });
        } else {
          res.send({
            code: 201,
            message: "Email hoặc Mã Code đã được sử dụng",
          });
        }
      });
    });
  }
}

function changePass(req, res) {
  const userId = jwt_decode(req.headers.authorization).id; //giải mã token bị mã hóa rồi lấy ra id
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  MYSQL_DB.connect((err) => {
    let sql = `SELECT * FROM users WHERE user_id = ${userId}`;
    MYSQL_DB.query(sql, (err, results) => {
      if (err) {
        res.send({
          code: 201,
          message: "Thao tác không thành công",
        });
      }
      // else if (results === []) {
      //   res.send({
      //     code: 404,
      //     message: "Không tồn tại người dùng này",
      //   });
      // }
      else {
        if (oldPassword != results[0].password) {
          res.send({
            code: 201,
            message: "Mật khẩu cũ không chính xác",
          });
        } else if (newPassword.trim().length === 0) {
          res.send({
            code: 201,
            message: "Mật khẩu mới không được để trống",
          });
        } else {
          let sql = `
                    UPDATE users
                    SET password = "${newPassword}"
                    WHERE user_id = ${userId}
                    `; // cập nhật bảng user đặt pass bằng pass mới với điều kiện id = id
          MYSQL_DB.query(sql, (err, results) => {
            console.log(err);
            if (!err) {
              res.send({
                code: 200,
                message: "Đổi mật khẩu thành công",
              });
            }
          });
        }
      }
    });
  });
}

function getProfile(req, res) {
  const userId = jwt_decode(req.headers.authorization).id;
  // const role = jwt_decode(req.headers.authorization).role;

  MYSQL_DB.connect((err) => {
    let sql = `SELECT * FROM users WHERE user_id = ${userId}`;
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
          data: results[0],
        });
      }
    });
  });
}

function changeProfile(req, res) {
  const user_id = req.params.id;
  const user_code = req.body.user_code || "";
  const user_class = req.body.user_class || "";
  const user_faculty = req.body.user_faculty || "";
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const role = req.body.role;

  if (
    name === undefined ||
    name === "" ||
    phone === undefined ||
    phone === "" ||
    email === undefined ||
    email === "" ||
    address === undefined ||
    address === "" ||
    role === undefined ||
    role === ""
  ) {
    res.send({
      code: 201,
      message: "Vui lòng điền đầy đủ thông tin",
    });
  } else {
    if (role === 1 || role === 2) {
      MYSQL_DB.connect((err) => {
        let sql = `
                UPDATE users
                SET user_code = "${user_code}",
                    user_class = "${user_class}",
                    user_faculty = "${user_faculty}",
                    name = "${name}", 
                    phone = "${phone}", 
                    email = "${email}", 
                    address = "${address}", 
                    role = ${role}
                WHERE user_id = ${user_id}
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
      });
    } else {
      if (
        user_code === undefined ||
        user_code === "" ||
        user_class === undefined ||
        user_code === "" ||
        user_faculty === "" ||
        user_faculty === undefined
      ) {
        res.send({
          code: 201,
          message: "Vui lòng điền đầy đủ thông tin",
        });
      } else {
        MYSQL_DB.connect((err) => {
          let sql = `
                    UPDATE users
                    SET user_code = "${user_code}",
                        user_class = "${user_class}",
                        user_faculty = "${user_faculty}",
                        name = "${name}", 
                        phone = "${phone}", 
                        email = "${email}", 
                        address = "${address}", 
                        role = ${role}
                    WHERE user_id = ${user_id}
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
        });
      }
    }
  }
}

function deleteProfile(req, res) {
  const id = req.params.id;

  MYSQL_DB.connect((err) => {
    let sql = `DELETE FROM users WHERE user_id = ${id}`;
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

function searchProfile(req, res) {
  const key = req.body.key.trim() || "";
  const role = req.body.role;

  if (role === 0) {
    let sql = `
    SELECT * FROM users
    WHERE role = 0 OR role = 3
    AND concat(user_code, user_class, user_faculty, name, phone, email, address) 
    LIKE "%${key}%"`; // chọn tất cả user điều kiện là vai trò 0 hoặc 3 và gộp các trường có giống với giá trị truyền vào
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
          // data: omitPasswordHelper.omitPasswordList(results),
        });
      }
    });
  } else {
    MYSQL_DB.connect((err) => {
      let sql = `
      SELECT * FROM users 
      WHERE role != 0 AND role != 3
      AND concat(user_code, user_class, user_faculty, name, phone, email, address) 
      LIKE "%${key}%"`;
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
            // data: omitPasswordHelper.omitPasswordList(results),
          });
        }
      });
    });
  }
}

// helper functions

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function omitPassword2(data) {
  return data.map((item) => {
    const { password, ...userWithoutPassword } = item;
    return userWithoutPassword;
  });
}
