const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const psicologos = require("../models/psicologo");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    psicologos.findOne({ email: req.body.email })
        .then((psicologo) => {
            if (psicologo) {
                res.status(201).json({
                    message: "Email exists !",
                });
            } else {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    const psicologo = new psicologos({
                        email: req.body.email,
                        servico: req.body.servico,
                        nome: req.body.nome,
                        password: hash,
                    });
                    psicologo
                        .save()
                        .then((result) => {
                            res.status(201).json({
                                message: "psicologo created!",
                                result: result,
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                error: err,
                            });
                        });
                });
            }
        })
        .catch();
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    psicologos.findOne({ email: req.body.email })
        .then((psicologo) => {
            //se não existir user, sai e envia mensagem
            if (!psicologo) {
                console.log("1");
                // return res.status(401).json({
                //   message: "Auth failed",
                // });
                return null;
            }
            //copia user
            fetchedUser = psicologo;
            //compara passwords
            return bcrypt.compare(req.body.password, user.password);
        })
        .catch((err) => {
            console.log("2");
            return res.status(401).json({
                error: err,
            });
        })
        .then((result) => {
            console.log(result);
            //se passwords não são iguais, sai e envia mensagem
            if (!result) {
                console.log("3");
                return res.status(401).json({
                    message: "Auth failed",
                });
            }
            //senão,  cria token
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            );
            //envia token ao user
            console.log("4");
            res.status(200).json({
                token: token,
            });
        })
        .catch((err) => {
            console.log("5");
            return res.status(401).json({
                message: "Auth failed",
            });
        });
});

router.get('/list', function (req, res) {
    psicologos.find().then((documents) => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            psicologos: documents,
        });
    });
});
module.exports = router;
