describe('Able to find landing page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('body').should('exist');
  });
});
