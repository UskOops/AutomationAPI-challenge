Cypress.Commands.add('login', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  cy.request({
    method: 'POST',
    url: '/auth/login',
    headers: { 'Content-Type': 'application/json' },
    body: { username, password },
    failOnStatusCode: false
  }).then((response) => {
    console.log('Status:', response.status);
    console.log('Body:', response.body);

    expect([200, 201]).to.include(response.status);

    const token = response.body.accessToken;
    expect(token).to.exist;
    Cypress.env('token', token);
  });
});
