const express = require('express');
const { getProvinces, getDistricts, getWards } = require('../controllers/unitVietNam.controllers')

const unitVietNamRoute = express.Router();
unitVietNamRoute
    .route('/provinces')
    .get(
        getProvinces
    )

unitVietNamRoute
    .route('/districts/:id')
    .get(
        getDistricts
    )

unitVietNamRoute
    .route('/wards/:id')
    .get(
        getWards
    )

module.exports = { unitVietNamRoute }