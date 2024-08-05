import { mount } from 'cypress/react18';
import { LoadingDots } from './index';

describe('LoadingDots Component', () => {
  beforeEach(() => {
    mount(<LoadingDots />);
  });

  it('renders three bouncing dots', () => {
    cy.get('div.flex').within(() => {
      cy.get('div').should('have.length', 3);
    });
  });

  it('renders dots with correct classes', () => {
    cy.get('div.flex').within(() => {
      cy.get('div')
        .eq(0)
        .should('have.class', 'animate-bounce')
        .and('have.class', 'bg-indigo-600')
        .and('have.class', 'h-4')
        .and('have.class', 'w-4')
        .and('have.class', 'rounded-full');

      cy.get('div')
        .eq(1)
        .should('have.class', 'animate-bounce')
        .and('have.class', 'bg-indigo-600')
        .and('have.class', 'h-4')
        .and('have.class', 'w-4')
        .and('have.class', 'rounded-full')
        .and('have.class', 'animation-delay-200');

      cy.get('div')
        .eq(2)
        .should('have.class', 'animate-bounce')
        .and('have.class', 'bg-indigo-600')
        .and('have.class', 'h-4')
        .and('have.class', 'w-4')
        .and('have.class', 'rounded-full')
        .and('have.class', 'animation-delay-400');
    });
  });
});
