import { mount } from 'cypress/react18';
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
    mount(<Badge description={<span>Badge Description</span>} />);
    cy.get('span').contains('Badge Description').should('exist');
  });

  it('should apply the correct tooltip position', () => {
    mount(<Badge tooltip="Tooltip text" tooltipPosition="tooltip-right" />);
    cy.get('span.tooltip').should('have.class', 'left-full ml-2');
  });

  it('should apply the correct type classes', () => {
    mount(<Badge title="Success Badge" type="success" />);
    cy.get('span').should('have.class', 'bg-green-200 text-green-700');
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
    cy.get('span.tooltip').should('have.text', 'Tooltip text');
  });

  it('should render the badge with indigo type', () => {
    mount(<Badge title="Indigo Badge" type="indigo" />);
    cy.get('span').should('have.class', 'bg-indigo-200 text-indigo-700');
  });

  it('should render the badge with purple type', () => {
    mount(<Badge title="Purple Badge" type="purple" />);
    cy.get('span').should('have.class', 'bg-purple-200 text-purple-700');
  });

  it('should render the badge with pink type', () => {
    mount(<Badge title="Pink Badge" type="pink" />);
    cy.get('span').should('have.class', 'bg-pink-200 text-pink-700');
  });
});
