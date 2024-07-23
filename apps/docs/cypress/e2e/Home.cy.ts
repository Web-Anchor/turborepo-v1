describe('Home Page', () => {
  // have to have a text in dom Get started by editing app/page.tsx
  it('should display the title', () => {
    cy.visit('/');
    cy.contains('code', 'docs');
  });
});
