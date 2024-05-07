const express = require('express');
const {login} = require('../controllers/auth.controller');
const authRoute = express.Router();
authRoute
    .route('/login')
    .post(
        login
    );
module.exports = { authRoute }