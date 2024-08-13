import { mount } from 'cypress/react18';
import { Switch } from './index';

describe('Switch Component', () => {
  it('should render correctly with default props', () => {
    mount(<Switch />);
    cy.get('button').should('have.class', 'bg-gray-200');
  });

  it('should toggle on click when enabled', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    mount(<Switch onChange={onChangeSpy} />);

    cy.get('button').click();
    cy.get('@onChangeSpy').should('have.been.calledWith', true);
  });

  it('should not toggle when disabled', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    mount(<Switch enabled disabled onChange={onChangeSpy} />);

    cy.get('button').should('have.attr', 'disabled');
    cy.get('button').should('be.disabled');
  });

  it('should apply custom classes', () => {
    mount(<Switch className="custom-class" />);
    cy.get('button').should('have.class', 'custom-class');
  });

  it('should render in enabled state', () => {
    mount(<Switch enabled />);
    cy.get('button').should('have.class', 'bg-indigo-600');
    cy.get('span').should('have.class', 'translate-x-5');
  });

  it('should render in disabled state', () => {
    mount(<Switch disabled />);
    cy.get('button')
      .should('have.class', 'cursor-not-allowed')
      .and('have.class', 'opacity-50');
  });
});
