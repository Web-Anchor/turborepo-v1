import { mount } from 'cypress/react18';
import { MediaScreenTitle } from './index';

describe('Sidebar Component Mobile iPhone-6', () => {
  // --------------------------------------------------------------------------------
  // 📌  Mobile device UI e2e tests
  // --------------------------------------------------------------------------------

  it('should display the small screen title', () => {
    mount(
      <MediaScreenTitle
        large="Home Link"
        small="Home"
        className="text-2xl font-bold"
      />
    );
    cy.viewport('iphone-6');
    cy.get('[data-cy=media-screen-title-small]').should('be.visible');
    cy.get('[data-cy=media-screen-title-large]').should('not.be.visible');
  });

  it('should display the large screen title', () => {
    mount(
      <MediaScreenTitle
        large="Home Link"
        small="Home"
        className="text-2xl font-bold"
      />
    );
    cy.viewport('macbook-13');
    cy.get('[data-cy=media-screen-title-small]').should('not.be.visible');
    cy.get('[data-cy=media-screen-title-large]').should('be.visible');
  });

  it('renders large title on small screens if small title is not provided', () => {
    mount(
      <MediaScreenTitle large="Home Link" className="text-2xl font-bold" />
    );
    cy.viewport('iphone-6');
    cy.get('[data-cy=media-screen-title-small]').should('be.visible');
    cy.get('[data-cy=media-screen-title-large]').should('not.be.visible');
  });
});
