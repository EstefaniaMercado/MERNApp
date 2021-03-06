const jwt = require('jsonwebtoken')

//verficar token

let verifyToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.user = decoded.user;
        next();

    });
};

module.exports = {
    verifyToken,
}