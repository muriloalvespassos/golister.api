const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx9igZAKtTMN-I9kqjjudQ4Vo7u-FZkT9VXV0uWGfdsAPuLwIMSFY709f0iYit70qDq/exec";

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let editandoId = null;

// ===============================
// FUNÇÃO PARA SALVAR NO LOCALSTORAGE
// ===============================
function salvarLocal() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

// ===============================
// FUNÇÃO PARA ENVIAR PARA O WEBHOOK
// ===============================
async function enviarWebhook(dados) {
  try {
    console.log("Enviando para webhook:", dados);
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    console.log("Webhook enviado:", dados);
  } catch (error) {
    console.error("Erro ao enviar webhook:", error);
  }
}

// ===============================
// RENDERIZAR LISTA
// ===============================
function renderizar() {
  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  clientes.forEach(cliente => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${cliente.nome} - ${cliente.email} - ${cliente.telefone}
      <button onclick="editar('${cliente.id}')">Editar</button>
      <button onclick="deletar('${cliente.id}')">Excluir</button>
    `;

    lista.appendChild(li);
  });
}

// ===============================
// SUBMIT DO FORMULÁRIO
// ===============================
document.getElementById("formCliente").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  if (editandoId) {
    // EDITAR
    const cliente = clientes.find(c => c.id === editandoId);

    cliente.nome = nome;
    cliente.email = email;
    cliente.telefone = telefone;

    salvarLocal();
    renderizar();

    enviarWebhook({
      acao: "editar",
      ...cliente
    });

    editandoId = null;

  } else {
    // CRIAR
    const novoCliente = {
      id: crypto.randomUUID(),
      nome,
      email,
      telefone
    };

    clientes.push(novoCliente);
    salvarLocal();
    renderizar();

    enviarWebhook({
      acao: "criar",
      ...novoCliente
    });
  }

  this.reset();
});

// ===============================
// EDITAR
// ===============================
function editar(id) {
  const cliente = clientes.find(c => c.id === id);

  document.getElementById("nome").value = cliente.nome;
  document.getElementById("email").value = cliente.email;
  document.getElementById("telefone").value = cliente.telefone;

  editandoId = id;
}

// ===============================
// DELETAR
// ===============================
function deletar(id) {
  const cliente = clientes.find(c => c.id === id);

  clientes = clientes.filter(c => c.id !== id);

  salvarLocal();
  renderizar();

  enviarWebhook({
    acao: "deletar",
    id: cliente.id
  });
}

// Inicializa lista ao carregar
renderizar();
