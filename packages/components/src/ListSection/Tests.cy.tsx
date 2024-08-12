import { mount } from 'cypress/react18';
import { ListSection } from './index';

describe('ListSection Component', () => {
  beforeEach(() => {
    mount(
      <ListSection
        list={['Feature 1', 'Feature 2', <span key="custom">Custom Node</span>]}
        theme="dark"
        className="custom-class"
        dataAttribute="feature-list"
      />
    );
  });

  it('should render all list items', () => {
    cy.get('dt').should('have.length', 2);
    cy.get('dt').first().should('contain.text', 'Feature 1');
    cy.get('dt').last().should('contain.text', 'Feature 2');
    cy.get('span').should('contain.text', 'Custom Node');
  });

  it('should apply the correct theme class', () => {
    cy.get('div[data-cy="feature-list"]').should('have.class', 'bg-gray-800');
  });

  it('should apply additional classes', () => {
    cy.get('div[data-cy="feature-list"]').should('have.class', 'custom-class');
  });

  it('should handle white theme', () => {
    mount(
      <ListSection list={['Dark Feature 1', 'Dark Feature 2']} theme="light" />
    );
    cy.get('div').first().should('not.have.class', 'bg-gray-800');
  });

  it('should not render an empty list without errors', () => {
    mount(<ListSection />);
    cy.get('div[data-cy="feature-list"]').should('not.exist');
  });
});
