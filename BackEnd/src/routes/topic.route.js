const express = require('express');
const {createTopic,getTopics} = require('../controllers/topic.controllers')
const {authenMiddleware} = require('../middlewares/authen.middleware'); 
const topicRoute = express.Router();
topicRoute
    .route('/')
    .get(
        authenMiddleware,
        getTopics
    )
    .post(
      authenMiddleware ,
      createTopic
    );
    
module.exports = { topicRoute }