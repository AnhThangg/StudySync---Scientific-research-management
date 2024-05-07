const express = require('express');
const { getAllFacultyCodeForUniver, getUnconfirmedTopicsForFaculty, approveTopicForFaculty } = require('../controllers/faculty.controller');
const { authenMiddleware } = require('../middlewares/authen.middleware');

const facultyRoute = express.Router();


facultyRoute
    .route('/approveTopicForFaculty/:id')
    .patch(
        authenMiddleware,
        approveTopicForFaculty
    );

facultyRoute
    .route('/UnconfirmedTopicsForFaculty')
    .get(
        authenMiddleware,
        getUnconfirmedTopicsForFaculty
    );

facultyRoute
    .route('/:id')
    .get(
        getAllFacultyCodeForUniver,
    )


module.exports = { facultyRoute }
