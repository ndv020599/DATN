require("dotenv").config();
const { expressjwt } = require('express-jwt');


module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET_KEY;
    return expressjwt({ secret , algorithms: ['HS256'] }).unless({
        path: [
            '/users/login',
            '/users/signup'
        ]
    });
}
