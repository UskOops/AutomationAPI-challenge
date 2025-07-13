describe('POST /auth/products/add', () => {
  beforeEach(() => {
    cy.login();
  });

  it('deve criar um produto com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/auth/products/add',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      },
      body: {
        title: "Perfume Oil",
        description: "Mega Discount, Impression of A...",
        price: 13,
        discountPercentage: 8.4,
        rating: 4.26,
        stock: 65,
        brand: "Impression of Acqua Di Gio",
        category: "fragrances",
        thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg"
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.include({
        title: "Perfume Oil",
        price: 13,
        stock: 65,
        brand: "Impression of Acqua Di Gio"
      });
    });
  });
    it('deve falhar ao criar um produto sem token', () => {
        cy.request({
        method: 'POST',
        url: 'https://dummyjson.com/auth/products/add',
        headers: {
            Authorization

            : `Bearer invalid_token`
        },
        body: {
            title: "Perfume Oil",
            description: "Mega Discount, Impression of A...",
            price: 13,
            discountPercentage: 8.4,
            rating: 4.26,
            stock: 65,
            brand: "Impression of Acqua Di Gio",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg"
    },
    failOnStatusCode: false 
  }).then((res) => {
    expect(res.status).to.eq(401);
  });
});
});
