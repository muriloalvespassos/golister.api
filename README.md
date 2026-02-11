# Golisters - Desafio Técnico Especialista de API

## 📌 Descrição

Este projeto simula a captura de dados provenientes de plataformas externas e sua sincronização automática com o Google Workspace, garantindo controle total das informações dentro da infraestrutura própria.

A aplicação permite:

- Criar clientes
- Editar clientes
- Excluir clientes
- Sincronizar automaticamente os dados com Google Planilhas via Webhook

---

## 🔗 Links do Projeto

Repositório:git
https://github.com/muriloalvespassos/golister.api

Planilha integrada:
https://docs.google.com/spreadsheets/d/1rH5RJbJZbIKQeT0ZL7P5VkFJYCZg24yMS7LmfyhJEZI/edit

Webhook (Google Apps Script):
https://script.google.com/macros/s/AKfycbz2JjAKjHF-F4bQZX3qXQEEVHdaDsqHT2DWVJY-HXxbqTzhTA1VUsMtq68MG9YKvqXg/exec

---

## 🏗️ Arquitetura da Solução

A solução foi dividida em três camadas principais:

### 1️⃣ Front-End
- HTML5 + JavaScript puro (ES6)
- Persistência local utilizando `localStorage`
- Geração de identificador único interno com `crypto.randomUUID()`
- Disparo automático de Webhook a cada ação (Create, Update, Delete)

### 2️⃣ Webhook (Integração)
- Envio de requisições HTTP `POST` via Fetch API
- Estrutura de dados padronizada em JSON
- Comunicação em tempo real com o Google Apps Script

### 3️⃣ Google Apps Script (Receptor)
- Função `doPost(e)` atuando como listener
- Recebimento e processamento do JSON enviado
- Integração com Google Planilhas
- Lógica para:
  - Criar registros
  - Atualizar registros existentes
  - Deletar registros
- Busca baseada em ID interno para evitar inconsistências

---

## 🔄 Fluxo de Funcionamento

1. Usuário cria, edita ou exclui um cliente na interface.
2. Os dados são armazenados localmente via `localStorage`.
3. Um Webhook é disparado automaticamente.
4. O Google Apps Script recebe o JSON via `doPost(e)`.
5. A planilha é atualizada em tempo real.

---

## 📦 Estrutura do JSON Enviado

```json
{
  "acao": "criar | editar | deletar",
  "id": "uuid",
  "nome": "string",
  "email": "string",
  "telefone": "string"
}

### Atualizado ###