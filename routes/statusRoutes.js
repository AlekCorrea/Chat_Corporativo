const express = require("express");
const router = express.Router();

let clientes = [];

router.setClientes = (lista)=>{
clientes = lista;
};

router.get("/",(req,res)=>{

res.json({
status:"Servidor Online",
usuarios:clientes.length
});

});

module.exports = router;
