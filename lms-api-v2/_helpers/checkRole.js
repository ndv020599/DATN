const jwt_decode = require("jwt-decode");

const checkRole = {
  checkAdmin: (req, res, next) => {
    const role = jwt_decode(req.headers.authorization).role;
    if (role === 0) {
      res.send({
        code: 401,
        message: "Bạn không thể thực hiện thao tác này",
      });
      return;
    } else {
      next();
    }
  }
}

module.exports = checkRole;


