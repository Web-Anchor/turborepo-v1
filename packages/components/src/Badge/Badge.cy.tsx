import { mount } from 'cypress/react';
import { Badge } from './index';

describe('Badge Component', () => {
  it('should render the badge', () => {
    mount(<Badge title="Badge Title" />);
    cy.get('span').should('exist');
  });

  it('should not render when hide is true', () => {
    mount(<Badge hide={true} />);
    cy.get('span').should('not.exist');
  });

  it('should display the title prop', () => {
    mount(<Badge title="Badge Title" />);
    cy.get('span').contains('Badge Title').should('exist');
  });

  it('should display the description prop', () => {
    mount(<Badge description="Badge Description" />);
    cy.get('span').contains('Badge Description').should('exist');
  });

  it('should apply the correct tooltip position', () => {
    mount(<Badge tooltip="Tooltip text" tooltipPosition="tooltip-right" />);
    cy.get('[data-tip="Tooltip text"]').should('have.class', 'tooltip-right');
  });

  it('should apply the correct type classes', () => {
    mount(<Badge title="Success Badge" type="success" />);
    cy.get('span').should('have.class', 'bg-green-100 text-green-800');
  });

  it('should call onClick when clicked', () => {
    const onClick = cy.stub();
    mount(<Badge title="Clickable Badge" onClick={onClick} />);
    cy.get('span').click();
    cy.wrap(onClick).should('have.been.called');
  });

  it('should have additional class names', () => {
    mount(<Badge title="Classy Badge" className="extra-class" />);
    cy.get('span').should('have.class', 'extra-class');
  });

  it('should display the tooltip', () => {
    mount(<Badge title="Badge with Tooltip" tooltip="Tooltip text" />);
    cy.get('section').should('have.attr', 'data-tip', 'Tooltip text');
  });
});
