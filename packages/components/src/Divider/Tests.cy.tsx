import { mount } from 'cypress/react18';
import { Divider } from './index';

describe('Divider Component', () => {
  it('renders with left text alignment by default', () => {
    mount(<Divider text="Projects" />);
    cy.get('.relative.flex').should('have.class', 'justify-start');
    cy.get('span').should('have.text', 'Projects');
    cy.get('.w-full.border-t').should('be.visible');
  });

  it('renders with center text alignment', () => {
    mount(<Divider text="Projects" textAlign="center" />);
    cy.get('.relative.flex').should('have.class', 'justify-center');
    cy.get('span').should('have.text', 'Projects');
    cy.get('.w-full.border-t').should('be.visible');
  });

  it('renders with right text alignment', () => {
    mount(<Divider text="Projects" textAlign="right" />);
    cy.get('.relative.flex').should('have.class', 'justify-end');
    cy.get('span').should('have.text', 'Projects');
    cy.get('.w-full.border-t').should('be.visible');
  });

  it('hides the left border when textAlign is "left"', () => {
    mount(<Divider text="Projects" textAlign="left" />);
    cy.get('.w-full.border-t').first().should('not.be.visible');
    cy.get('.w-full.border-t').last().should('be.visible');
  });

  it('hides the right border when textAlign is "right"', () => {
    mount(<Divider text="Projects" textAlign="right" />);
    cy.get('.w-full.border-t').last().should('not.be.visible');
    cy.get('.w-full.border-t').first().should('be.visible');
  });

  it('shows both borders when textAlign is "center"', () => {
    mount(<Divider text="Projects" textAlign="center" />);
    cy.get('.w-full.border-t').first().should('be.visible');
    cy.get('.w-full.border-t').last().should('be.visible');
  });
});
