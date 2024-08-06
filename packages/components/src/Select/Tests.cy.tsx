import { mount } from 'cypress/react18';
import { Select } from './index';

describe('Select Component', () => {
  const data = [
    { value: 1, title: 'Option 1' },
    { value: 2, title: 'Option 2' },
    { value: 3, title: 'Option 3' },
  ];

  beforeEach(() => {
    mount(<Select data={data} label="Select an option" />);
  });

  it('renders the select component with label', () => {
    cy.get('label').contains('Select an option').should('be.visible');
  });

  it('opens the options list on click', () => {
    cy.get('button').click();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('button').should('have.attr', 'data-open');
  });

  it('selects an option', () => {
    cy.get('button').click();
    cy.get('[role="option"]').contains('Option 1').click();
    cy.get('button').contains('Option 1').should('be.visible');
  });

  it('renders the correct number of options', () => {
    cy.get('button').click();
    cy.get('[role="option"]').should('have.length', data.length);
  });

  it('applies correct classes on selection', () => {
    cy.get('button').click();
    cy.get('[role="option"]').contains('Option 1').click();
    cy.get('button').should('have.class', 'relative');
  });
});
