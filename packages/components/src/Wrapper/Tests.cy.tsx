import { mount } from 'cypress/react18';
import { Wrapper } from './index';

describe('Wrapper Component', () => {
  beforeEach(() => {
    mount(
      <Wrapper
        className="custom-class p-4 bg-gray-100"
        id="main-wrapper"
        dataAttribute="main-wrapper"
      >
        Your content goes here
      </Wrapper>
    );
  });

  it('applies custom class names', () => {
    cy.get('#main-wrapper').should('have.class', 'custom-class');
  });

  it('applies padding and background color', () => {
    cy.get('#main-wrapper')
      .should('have.class', 'p-4')
      .and('have.class', 'bg-gray-100');
  });

  it('renders children correctly', () => {
    cy.get('#main-wrapper').within(() => {
      cy.contains('Your content goes here');
    });
  });

  it('has the correct id', () => {
    cy.get('#main-wrapper').should('exist');
  });
});
