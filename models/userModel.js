let usuarios = [];

function criarUsuario(usuario, senha){

    const existe = usuarios.find(u => u.usuario === usuario);

    if(existe){
        return {erro:"Usuário já existe"};
    }

    usuarios.push({usuario, senha});

    return {sucesso:true};

}

function autenticar(usuario, senha){

    const user = usuarios.find(u =>
        u.usuario === usuario && u.senha === senha
    );

    if(!user){
        return null;
    }

    return user;

}

module.exports = {
    criarUsuario,
    autenticar
};