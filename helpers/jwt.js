const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise (( resolve, reject ) => {
        const paylod = {
            uid
        };
    
        jwt.sign(paylod, process.env.JWT_SECRET, {
            expiresIn:'12h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(token);
    
        });
    })    
}

module.exports = {
    generateJWT
};