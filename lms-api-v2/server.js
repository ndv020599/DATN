require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use('/users', require('./controllers/users.controllers'));
app.use('/category', require('./controllers/category.controller'));
app.use('/book', require('./controllers/book.controller'))
app.use('/request', require('./controllers/request.controller'))
app.use('/dashboard', require('./controllers/dashboard.controller'))

app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
