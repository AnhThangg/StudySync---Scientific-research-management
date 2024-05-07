const express = require('express');
const { getInfoPersonal, getRole, getAvatar, getNameMentor } = require('../controllers/info.controllers')
const { authenMiddleware } = require('../middlewares/authen.middleware');
const infoRoute = express.Router();
infoRoute
  .route('/')
  .get(
    authenMiddleware,
    getInfoPersonal
  );
infoRoute
  .route('/role')
  .get(
    authenMiddleware,
    getRole
  );
infoRoute
  .route('/avatar/:id')
  .get(
    getAvatar
  );

infoRoute
  .route('/nameMentor/:facultyCode')
  .get(
    getNameMentor
  )

module.exports = { infoRoute }