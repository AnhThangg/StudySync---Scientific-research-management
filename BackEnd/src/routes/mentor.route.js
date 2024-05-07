const express = require('express');
const { getMentor, getUnconfirmedTopicsForMentor, approveTopicForMentor, getUnconfirmedTopicDetailForMentor, getConfirmedTopicsForMentor, getConfirmedTopicDetailForMentor } = require('../controllers/mentor.controllers')
const { authenMiddleware } = require('../middlewares/authen.middleware');
const mentorRoute = express.Router();
mentorRoute
  .route('/getmentor/:id')
  .get(
    getMentor
  );

mentorRoute
  .route('/UnconfirmedTopicsForMentor')
  .get(
    authenMiddleware,
    getUnconfirmedTopicsForMentor
  );

mentorRoute
  .route('/approveTopicForMentor/:id')
  .patch(
    authenMiddleware,
    approveTopicForMentor
  );

mentorRoute
  .route('/unconfirmedTopicDetailForMentor/:id')
  .get(
    authenMiddleware,
    getUnconfirmedTopicDetailForMentor
  );

mentorRoute
  .route('/confirmedTopicsForMentor')
  .get(
    authenMiddleware,
    getConfirmedTopicsForMentor
  );

mentorRoute
  .route('/confirmedTopicDetailForMentor/:id')
  .get(
    authenMiddleware,
    getConfirmedTopicDetailForMentor
  );

module.exports = { mentorRoute }