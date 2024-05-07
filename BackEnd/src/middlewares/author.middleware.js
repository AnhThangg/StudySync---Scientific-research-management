const authorMiddleware = (role) => {
    return (req,res,next) => {
        if(req.account.role !==  role) {
            return res.status(403).json('Not Have Permission');
        }
        next();
    }
}

module.exports = {
    authorMiddleware,
}