const usuario = localStorage.getItem("usuario");

const ws = new WebSocket("ws://localhost:3000?usuario=" + usuario);

const chat = document.getElementById("mensagens");
const input = document.getElementById("texto");


/* ================= HISTÓRICO ================= */

fetch("/api/mensagens")
.then(res => res.json())
.then(lista => {

lista.forEach(m => {

const msg = document.createElement("div");

if(m.usuario === usuario){
msg.classList.add("minha");
}else{
msg.classList.add("outro");
}

msg.innerHTML = `
<strong>${m.usuario}</strong><br>
${m.mensagem}
`;

chat.appendChild(msg);

});

chat.scrollTop = chat.scrollHeight;

});


/* ================= RECEBER ================= */

ws.onmessage = (event)=>{

const dados = JSON.parse(event.data);

const msg = document.createElement("div");

if(dados.usuario === usuario){
msg.classList.add("minha");
}else{
msg.classList.add("outro");
}

msg.innerHTML = `
<strong>${dados.usuario}</strong><br>
${dados.mensagem}
`;

chat.appendChild(msg);

chat.scrollTop = chat.scrollHeight;

};


/* ================= ENVIAR ================= */

function enviar(){

const texto = input.value.trim();

if(texto === "") return;

ws.send(JSON.stringify({

usuario: usuario,
mensagem: texto

}));

input.value="";

}


/* ENTER ENVIA */

input.addEventListener("keypress",(e)=>{
if(e.key === "Enter") enviar();
});