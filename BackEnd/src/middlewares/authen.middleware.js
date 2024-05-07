const jwt = require("jsonwebtoken");
const { AccountUser } = require('../database/database');
const authenMiddleware = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).json('Have Not Login');
        }
        const token = bearerToken.split(" ")[1];
        let data;
        try {
            data = jwt.verify(token, 'studySync');
        } catch (error) {
            return res.status(401).json('Invalid Token')
        }
        const findAccount = await AccountUser.findOne({
            where: {
                userName: data.userName,
            }
        })
        if(!findAccount){
            return res.status(404).json('Account has been deleted');
        }
        req.account = findAccount;
        return next();

    } catch (e) {
        return res.status(500).json(e);
    }
}

module.exports = {
    authenMiddleware,
}