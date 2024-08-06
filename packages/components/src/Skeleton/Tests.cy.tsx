import { mount } from 'cypress/react18';
import { Skeleton } from './index';

describe('Skeleton Component', () => {
  it('renders user skeleton correctly', () => {
    mount(<Skeleton type="user" />);
    cy.get('.flex').should('have.class', 'flex-row');
    cy.get('.flex-row .rounded-full').should('exist');
    cy.get('.flex-col .w-2\\/6').should('exist');
    cy.get('.flex-col .w-1\\/6').should('exist');
  });

  it('renders list skeleton correctly', () => {
    mount(<Skeleton type="list" />);
    cy.get('.flex').should('have.class', 'flex-col');
    cy.get('.h-2').should('have.length', 5);
  });

  it('renders table skeleton correctly', () => {
    mount(<Skeleton type="table" />);
    cy.get('.border').should('have.class', 'border-blue-300');
    cy.get('.h-2').should('have.length', 4);
  });

  it('renders card skeleton correctly', () => {
    mount(<Skeleton type="card" />);
    cy.get('.border').should('have.class', 'border-blue-300');
    cy.get('.rounded-full').should('exist');
    cy.get('.h-2').should('have.length', 4);
  });

  it('does not render when hide prop is true', () => {
    mount(<Skeleton type="user" hide />);
    cy.get('.flex').should('not.exist');
  });

  it('renders with custom width, height, borderRadius and additionalClasses', () => {
    mount(
      <Skeleton
        type="card"
        width="max-w-md"
        height="w-full"
        borderRadius="rounded-lg"
        className="bg-gray-100"
      />
    );
    cy.get('.border').should('have.class', 'max-w-md');
    cy.get('.border').should('have.class', 'w-full');
    cy.get('.border').should('have.class', 'rounded-lg');
    cy.get('.border').should('have.class', 'bg-gray-100');
  });

  it('renders with data attribute', () => {
    mount(<Skeleton type="table" dataAttribute="table-skeleton" />);
    cy.get('[data-cy="table-skeleton"]').should('exist');
  });
});
