# Golisters - Desafio Técnico Especialista de API

## 📌 Descrição

Este projeto simula a captura de dados externos e sua sincronização automática com o Google Workspace, garantindo controle total sobre as informações.

A aplicação permite:

- Criar clientes
- Editar clientes
- Excluir clientes
- Sincronizar automaticamente com Google Planilhas via Webhook

---

## 🏗️ Arquitetura da Solução

A aplicação foi dividida em 3 camadas:

### 1️⃣ Front-End
- HTML + JavaScript puro
- Persistência local via `localStorage`
- Geração de ID único com `crypto.randomUUID()`
- Disparo automático de Webhook

### 2️⃣ Webhook
- Envio de requisições HTTP POST
- Estrutura JSON padronizada
- Comunicação em tempo real

### 3️⃣ Google Apps Script
- Função `doPost(e)` como listener
- Integração com Google Planilhas
- Lógica de:
  - Criar
  - Editar
  - Deletar registros
- Busca por ID interno para evitar inconsistências

---

## 🔄 Fluxo de Funcionamento

1. Usuário cria/edita/deleta cliente
2. Dados são salvos no `localStorage`
3. Webhook é disparado automaticamente
4. Google Apps Script recebe JSON
5. Planilha é atualizada em tempo real

---

## 🛠 Tecnologias Utilizadas

- HTML5
- JavaScript (ES6)
- localStorage
- Fetch API
- Google Apps Script
- Google Sheets

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:
