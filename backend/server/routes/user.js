const express = require('express');
const bcrypt = require('bcrypt')
const _ = require('underscore')

const User = require('../models/user');
const { verifyToken } = require('../middlewares/autenticacion')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/user', (req, res) => {

    // let desde = req.query.desde || 0;
    // desde = Number(desde);

    // let limite = req.query.limite || 5;
    // limite = Number(limite);

    User.find({ status: true }, 'name email status google')
        // .skip(desde)
        // .limit(limite)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ status: true }, (err) => {
                res.json({
                    ok: true,
                    users,
                });
            })
        })
})

app.post('/user', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    })

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        })

    });
})

app.put('/user/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            userDB: userDB
        })

    })

})

app.delete('/user/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let changeStatus = {
        status: false
    }
    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (user === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            user: user
        })

    })
})

module.exports = app;