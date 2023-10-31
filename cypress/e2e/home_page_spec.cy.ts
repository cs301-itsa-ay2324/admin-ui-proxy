describe('Home Page Tests', () => {
  it('Visiting the home page', () => {
    cy.visit('/');
    cy.contains('Admin Panel').should('be.visible');
    cy.contains('Logout').should('be.visible');
    cy.contains('Hello world').should('be.visible');
    cy.contains('Users').should('be.visible');
    cy.contains('Logs').should('be.visible');
  });

});
