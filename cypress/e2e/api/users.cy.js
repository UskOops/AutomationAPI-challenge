
describe('GET /users', () => {
  it('deve retornar usuários com campos obrigatórios e paginação', () => {
    cy.request('https://dummyjson.com/users').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.users).to.have.length.lte(30);

      res.body.users.forEach(user => {
        expect(user).to.have.all.keys(
          'id', 'firstName', 'lastName', 'maidenName', 'age',
          'gender', 'email', 'phone', 'username', 'password',
          'birthDate', 'image', 'bloodGroup', 'height', 'weight',
          'eyeColor', 'hair', 'ip', 'address', 'macAddress',
          'university', 'bank', 'company', 'ein', 'ssn',
          'userAgent', 'crypto', 'role'
        );
      });
    });
  });
    it('deve retornar erro 404 para rota inexistente', () => {
        cy.request({
        method: 'GET',
        url: 'https://dummyjson.com/users/9999',
        failOnStatusCode: false // impede que o Cypress falhe o teste automaticamente
        }).then((res) => {
        expect(res.status).to.eq(404);
        });
    });
});
