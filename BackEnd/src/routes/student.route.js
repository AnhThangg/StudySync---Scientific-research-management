const express = require('express');
const { getStudent, getTopicApprovedForStudent, getTopicApprovedDetailForStudent } = require('../controllers/student.controllers')
const { authenMiddleware } = require('../middlewares/authen.middleware');
const studentRoute = express.Router();

studentRoute
  .route('/TopicApprovedForStudent')
  .get(
    authenMiddleware,
    getTopicApprovedForStudent
  );

studentRoute
  .route('/TopicApprovedDetailForStudent/:id')
  .get(
    authenMiddleware,
    getTopicApprovedDetailForStudent
  );

studentRoute
  .route('/:id')
  .get(
    authenMiddleware,
    getStudent
  );

module.exports = { studentRoute }