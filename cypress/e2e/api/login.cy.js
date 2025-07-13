describe('POST /auth/login', () => {
  beforeEach(() => {
    // log valores das variáveis de ambiente para debug
    console.log('Username:', Cypress.env('username'));
    console.log('Password:', Cypress.env('password'));

    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: { 'Content-Type': 'application/json' },
      body: {
        username: Cypress.env('username'),
        password: Cypress.env('password')
      },
      failOnStatusCode: false
    }).then((response) => {
      console.log('Status:', response.status);
      console.log('Body:', response.body);

      if (![200, 201].includes(response.status)) {
        throw new Error(`Falha no login: status ${response.status} - ${JSON.stringify(response.body)}`);
      }

      const token = response.body.accessToken;
      if (!token) {
        throw new Error('Token não retornado no login');
      }

      Cypress.env('token', token);
    });
  });

  it('deve autenticar o usuário e retornar o token JWT válido', () => {
    cy.wrap(Cypress.env('token')).should('match', /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });

    it('deve falhar com credenciais inválidas', () => {
        cy.request({
        method: 'POST',
        url: '/auth/login',
        headers: { 'Content-Type': 'application/json' },
        body: {
            username: 'usuario_invalido',
            password: 'senha_invalida'
        },
        failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Invalid credentials');
        });
    });
});
