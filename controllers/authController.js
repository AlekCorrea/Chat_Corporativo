const fs = require("fs");
const path = require("path");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

function lerUsuarios(){
    const data = fs.readFileSync(usuariosPath);
    return JSON.parse(data);
}

function salvarUsuarios(usuarios){
    fs.writeFileSync(
        usuariosPath,
        JSON.stringify(usuarios, null, 2)
    );
}

exports.login = (req,res)=>{

    const {usuario,senha} = req.body;

    const usuarios = lerUsuarios();

    const user = usuarios.find(u =>
        u.usuario === usuario && u.senha === senha
    );

    if(user){
        res.json({
            sucesso:true,
            usuario:user.usuario
        });
    }else{
        res.status(401).json({
            erro:"Usuário ou senha inválidos"
        });
    }

};


exports.register = (req,res)=>{

    const {usuario,senha} = req.body;

    const usuarios = lerUsuarios();

    const existe = usuarios.find(u => u.usuario === usuario);

    if(existe){
        return res.status(400).json({
            erro:"Usuário já existe"
        });
    }

    usuarios.push({usuario,senha});

    salvarUsuarios(usuarios);

    res.json({
        sucesso:true
    });

};