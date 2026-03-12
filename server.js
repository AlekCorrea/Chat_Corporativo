const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const iniciarWebSocket = require("./websocket/chat");

const app = express();
const server = http.createServer(app);


/* ================= CONFIGURAÇÃO ================= */

app.use(express.json());

app.use(express.static("public"));

app.use("/api", authRoutes);


/* ================= CAMINHO DO JSON ================= */

const mensagensPath = path.join(__dirname, "data", "mensagens.json");


/* ================= CRIAR JSON SE NÃO EXISTIR ================= */

if (!fs.existsSync(mensagensPath)) {
fs.writeFileSync(mensagensPath, "[]");
}


/* ================= ROTA HISTÓRICO ================= */

app.get("/api/mensagens", (req, res) => {

try {

const mensagens = JSON.parse(
fs.readFileSync(mensagensPath)
);

res.json(mensagens);

} catch (erro) {

console.error("Erro ao ler mensagens:", erro);

res.json([]);

}

});


/* ================= WEBSOCKET ================= */

iniciarWebSocket(server);


/* ================= INICIAR SERVIDOR ================= */

server.listen(3000, () => {

console.log("Servidor rodando em:");
console.log("http://localhost:3000/login.html");

});