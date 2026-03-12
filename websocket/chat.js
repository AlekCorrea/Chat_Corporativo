const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const url = require("url");

const mensagensPath = path.join(__dirname, "../data/mensagens.json");

function salvarMensagem(usuario, mensagem){

    const mensagens = JSON.parse(
        fs.readFileSync(mensagensPath)
    );

    mensagens.push({
        usuario,
        mensagem,
        data: new Date().toLocaleString()
    });

    fs.writeFileSync(
        mensagensPath,
        JSON.stringify(mensagens, null, 2)
    );
}

function iniciarWebSocket(server){

    const wss = new WebSocket.Server({server});

    let clientes = [];

    wss.on("connection",(ws,req)=>{

        const parametros = url.parse(req.url,true).query;
        const usuario = parametros.usuario;

        ws.usuario = usuario;

        clientes.push(ws);

        console.log("Usuário conectado:", usuario);

        // receber mensagens
        ws.on("message",(msg)=>{

            const dados = JSON.parse(msg);

            const mensagem = {
                usuario: ws.usuario,
                mensagem: dados.mensagem
            };

            // salvar no JSON
            salvarMensagem(ws.usuario, dados.mensagem);

            // enviar para todos
            clientes.forEach(cliente => {

                if(cliente.readyState === WebSocket.OPEN){

                    cliente.send(JSON.stringify(mensagem));

                }

            });

        });

        // desconectar
        ws.on("close",()=>{

            clientes = clientes.filter(c => c !== ws);

            console.log("Usuário saiu:", usuario);

        });

    });

}

module.exports = iniciarWebSocket;