# VaultTrack 💼📊

**VaultTrack** é uma API para controle de investimentos pessoais, permitindo o gerenciamento de bancos, investimentos, histórico de valores e análises agregadas.

---

## 🔧 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/) – documentação da API

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/vaulttrack.git
cd vaulttrack
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente 

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/vaulttrack
```

### 4. Rode as migrations do banco de dados
```
npx prisma migrate dev --name init
```

### 5. Inicie o servidor 
```
npm start
```
### 6. Acesse a API
API: http://localhost:3000/api

Documentação Swagger: http://localhost:3000/api-docs


````

📌 Agregações e Análises (FUTURE)
GET /investments/performance/:id: retorno percentual do investimento ((currentAmount - initialAmount) / initialAmount).
GET /investments/performance-summary: retorno percentual médio ou total de todos investimentos.
````
