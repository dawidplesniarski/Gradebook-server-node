const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const bearerHeader = req.header('Authorization');
    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, 'secretkey', (error, user) => {
            if(error) {
                return res.status(403).send('Forbidden route');
            }
            next();
        })
    } else {
        return res.status(404).send('No token provided');
    }
}

module.exports = verifyToken;