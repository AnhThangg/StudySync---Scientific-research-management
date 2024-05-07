const { AccountUser } = require('../database/database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { body: loginInfo } = req;
        const findAccount = await AccountUser.findOne({
            where: {
                userName: loginInfo.userName
            }
        });
        if (!findAccount) {
            return res.status(401).json('Wrong account or password');
        }
        if (findAccount.role !== 'admin') {
            const isValidPassword = bcrypt.compareSync(loginInfo.password, findAccount.password);
            if (!isValidPassword) {
                return res.status(401).json('Wrong account or password');
            }
        } else if (findAccount.password !== loginInfo.password) {
            return res.status(401).json('Wrong account or password');
        }
        
        const accessToken = jwt.sign(
            {
                userName: findAccount.userName,
                role: findAccount.role
            },
            'studySync',
            {
                expiresIn: 3 * 24 * 60 * 60
            }
        )
        return res.status(200).json({
            accessToken,
            role: findAccount.role,
            message: 'Login Successfully'
        })

    } catch (e) {
        return res.status(500).json(e);
    }
}

module.exports = {
    login
}