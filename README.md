
# Desafio Técnico – Automação de Testes de API com Cypress

Este projeto foi desenvolvido como solução para um **desafio técnico de QA** com foco em automação de testes de **API REST** utilizando o framework [Cypress](https://www.cypress.io/).

O objetivo é testar a API pública [DummyJSON](https://dummyjson.com/docs), validando autenticação, listagem e consulta de usuários, além da criação de produtos autenticados.

---

## ✅ Funcionalidades Testadas

| Caso de Teste                         | Endpoint                                | Status Esperado |
|--------------------------------------|-----------------------------------------|-----------------|
|  Autenticação de login             | `POST /auth/login`                      | 201 Created     |
|  Listar usuários com paginação     | `GET /users`                            | 200 OK          |
|  Consultar usuário por ID          | `GET /users/:id`                        | 200 OK          |
|  Criar produto autenticado         | `POST /auth/products/add`               | 201 Created     |
|  Validação de erros                | Ex: login inválido, ID inexistente, etc | 400 / 404       |

---

## Estrutura do Projeto

```
.
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── users.cy.js
│   │   ├── userById.cy.js
│   │   └── createProduct.cy.js
│   └── support/
│       └── e2e.js  ← comandos customizados (ex: cy.login)
├── cypress.config.js
├── package.json
└── README.md
```

---

## Comandos Customizados

Este projeto utiliza um comando Cypress customizado para login automático:

```js
// cypress/support/e2e.js
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/auth/login',
    body: {
      username: Cypress.env('username'),
      password: Cypress.env('password')
    }
  }).then((res) => {
    Cypress.env('token', res.body.token);
  });
});
```

---

## Variáveis de Ambiente

Crie um arquivo `cypress.env.json` na raiz do projeto com as seguintes credenciais:

```json
{
  "username": "xxxxx",
  "password": "xxxxx"
}
```

>  Este arquivo está no `.gitignore` e **não deve ser versionado**.

---

## Como Executar os Testes

### Instale as dependências

```bash
npm install
```

### Execute os testes

#### Modo Interativo (UI)
```bash
npx cypress open
```

#### Modo Headless (terminal)
```bash
npx cypress run
```

