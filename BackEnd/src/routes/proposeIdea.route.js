const express = require('express');
const {
    createProposeIdea,
    getListProposeIdea,
    getProposeIdea,
    deleteProposeIdea,
    getMyProposeIdea,
    updateProposalIdea
} = require('../controllers/proposeIdea.controlers')
const { authenMiddleware } = require('../middlewares/authen.middleware');
const proposeIdea = express.Router();

proposeIdea
    .route('/createProposeIdea')
    .post(
        authenMiddleware,
        createProposeIdea
    );

proposeIdea
    .route('/ListProposeIdea')
    .get(
        authenMiddleware,
        getListProposeIdea
    );

proposeIdea
    .route('/proposeideadetail/:id')
    .get(
        getProposeIdea
    );

proposeIdea
    .route('/deleteProposeIdea/:id')
    .delete(
        deleteProposeIdea
    );

proposeIdea
    .route('/myproposeidea')
    .get(
        authenMiddleware,
        getMyProposeIdea
    );

proposeIdea
    .route('/updateProposalIdea/:id')
    .patch(
        authenMiddleware,
        updateProposalIdea
    )

module.exports = { proposeIdea }