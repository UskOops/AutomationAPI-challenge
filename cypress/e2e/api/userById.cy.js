
describe('GET /users/:id', () => {
  it('deve retornar usuário com ID 1 com todos os dados esperados', () => {
    cy.request('https://dummyjson.com/users/1').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include({
        id: 1,
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily.johnson@x.dummyjson.com',
        username: 'emilys',
        gender: 'female',
        role: 'admin'
      });
    });
  });
    it('deve retornar erro 404 para usuário com ID inexistente', () => {
        cy.request({
        method: 'GET',
        url: 'https://dummyjson.com/users/9999',
        failOnStatusCode: false
        }).then((res) => {
        expect(res.status).to.eq(404);
        });
    });
    it('deve retornar erro 400 para ID inválido', () => {
        cy.request({
        method: 'GET',
        url: 'https://dummyjson.com/users/invalid-id',
        failOnStatusCode: false
        }).then((res) => {
        expect(res.status).to.eq(400);
        });
    });
});
