const express = require('express');
const { getAllUniverCode, getDashboardForUniver } = require('../controllers/univer.controllers');

const univerRoute = express.Router();


univerRoute
    .route('/getAllUniverCode')
    .get(
        getAllUniverCode,
    )
univerRoute
    .route('/dashboardForUniver/:id')
    .get(
        getDashboardForUniver,
    )

module.exports = { univerRoute }
