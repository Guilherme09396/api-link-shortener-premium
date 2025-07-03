# 🔗 Link Pro - API de Encurtamento de Links Premium

Bem-vindo à **Link Pro**, uma API REST para encurtamento de links com funcionalidades premium como autenticação, controle de redirecionamentos, métricas e muito mais.

> Projeto desenvolvido com foco em práticas modernas de desenvolvimento backend com **Node.js**, **TypeScript**, **Prisma**, **JWT**, **Redis** e **Express**.

---

## 🚀 Funcionalidades

- 🔐 Autenticação com JWT (login e cadastro)
- 🔗 Criação de links curtos personalizados
- 📈 Registro de cliques nos links
- 🧾 Listagem de links do usuário autenticado
- 🧮 Contagem de redirecionamentos por link
- ❌ Deleção de links
- 🔁 Redirecionamento automático via rota pública
- ⚙️ Middleware global de autenticação para rotas protegidas

---

## 🛠️ Tecnologias

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma (ORM)**
- **PostgreSQL**
- **Redis**
- **Zod (validações)**
- **JWT**
- **Docker**
- **dotenv**

---

## 📦 Instalação

```bash
git clone https://github.com/Guilherme09396/api-link-shortener-premium.git
cd api-link-shortener-premium
npm install
docker compose up
```
> Para rodar o último comando é necessário ter o docker instalado

---

## ⚙️ Configuração

Copie do arquivo `.env.example` as variáveis necessárias e informe os valores das mesmas

```env
DATABASE_URL=URL do PostgreSQL
URL_REDIS=URL do Redis
JWT_SECRET="sua_chave_secreta"
BASE_URL=URL base para redirecionamento (da própria api - http://localhost:{port})
PORT=3000 (caso não informado, por padrão será 3333)
```
> Caso utilize os serviço do PostgreSql e redis pelo docker compose, é necessário adicionar somente o JWT_SECRET ao .env

---

## 🧪 Scripts

- `npm run dev`: inicia o servidor com `tsx`
- `npm run build`: compila o projeto para JavaScript
- `npm start`: roda o projeto compilado
- `npx prisma migrate dev`: aplica as migrations
- `npx prisma studio`: interface visual do banco

---

## 🔄 Endpoints da API

### ✅ Autenticação

#### `POST /auth/register`

Cria um novo usuário.

```json
{
  "name": "Guilherme",
  "email": "guilherme@email.com",
  "password_hash": "123456"
}
```

#### `POST /auth/login`

Autentica o usuário e retorna um token JWT.

```json
{
  "email": "guilherme@email.com",
  "password_hash": "123456"
}
```

Retorno:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 🔗 Links

**Todas as rotas abaixo requerem o token JWT no header `Authorization: Bearer <token>`**

#### `POST /shorten`

Cria um link encurtado.

```json
{
  "url": "https://www.exemplo.com/um-link-longo",
  "customSlug": "meulink" // opcional,
  "expireAt": date | string // opcional
}
```

Retorno:

```json
{
  "shortUrl": "https://linkpro.com/meulink"
}
```

#### `GET /shorten/user`

Lista todos os links criados pelo usuário.

```json
[
  {
    "id": "uuid",
    "url": "https://...",
    "slug": "meulink",
    "clicks": 5,
    "createdAt": "2025-07-01T..."
  }
]
```

#### `GET /check/:slug`

Retorna se o link é privado.

#### `DELETE /shorten/:id`

Deleta um link por ID.

### 🔁 Redirecionamento

#### `GET /:slug`

Rota pública de redirecionamento.

- Acessa o link `{base_url}/meulink`
- Redireciona para `url` informada
- Incrementa o contador de cliques

### 🔁 Status

#### `GET /stats/:slug`

Retorna status de um link específico - informações dos cliques no link

---

## 🧩 Estrutura de Pastas

```
src/
├── env/                  # Config de variáveis
  └──  index.ts
├── http/                 # Toda parte de http
  ├── routes/             # Definições de rotas
  └──  controllers/       # Definições de controllers
├── lib/                  # Configurações de libs
  ├── prisma.ts         
  └── redis.ts          
├── middlewares/          # Middlewares (ex: auth)
├── repositories/         # Comunicação com o banco de dados
├── prisma/               # Schema do banco
├── services/             # Lógicas reutilizáveis
├── utils/                # Funções auxiliares
├── app.ts                
└── server.ts             # Ponto de entrada
```

---

## 🔒 Autenticação JWT

Envie o token no cabeçalho:

```http
Authorization: Bearer <seu_token>
```

---

## ✅ To Do

- [x] Middleware de autenticação
- [x] Redirecionamento público
- [x] Criação de links customizados
- [x] Registro de cliques
- [x] Expiração de links
- [ ] Painel frontend (em construção)

---

## 👨‍💻 Autor

[Guilherme Gomes](https://github.com/Guilherme09396)