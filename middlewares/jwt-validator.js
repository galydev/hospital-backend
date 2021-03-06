const jwt = require('jsonwebtoken');

const jwtValidator = (req ,res, next) => {
    
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok:false,
            msg:'no token in auth'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:'invalid token'
        });
    }

}

module.exports = {
    jwtValidator,
};