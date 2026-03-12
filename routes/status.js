const express = require("express");
const router = express.Router();

let usuariosOnline = 0;

router.get("/", (req, res) => {

    res.json({
        status: "Servidor Online",
        usuarios: usuariosOnline
    });

});

router.setUsuarios = (total) => {
    usuariosOnline = total;
};

module.exports = router;