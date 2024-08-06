import { Button } from './index'; // Adjust the import based on your component structure
import { mount } from 'cypress/react18';

describe('Button Component', () => {
  it('should display a title', () => {
    mount(<Button title="Primary CTA" />);
    cy.get('button').should('contain.text', 'Primary CTA');
  });

  it('should not render when hide is true', () => {
    mount(<Button hide />);
    cy.get('button').should('not.exist');
  });

  it('should display the title prop', () => {
    mount(<Button title="Click me!" />);
    cy.get('button').should('contain.text', 'Click me!');
  });

  it('should display the children prop', () => {
    mount(<Button>Click me!</Button>);
    cy.get('button').should('contain.text', 'Click me!');
  });

  it('should apply the primary style by default', () => {
    mount(<Button title="Click me!" />);
    cy.get('button').should('have.class', 'bg-indigo-600');
  });

  it('should apply the secondary style', () => {
    mount(<Button title="Click me!" style="secondary" />);
    cy.get('button').should('have.class', 'bg-indigo-600');
  });

  it('should apply the ghost style', () => {
    mount(<Button title="Click me!" style="ghost" />);
    cy.get('button').should('have.class', 'bg-transparent');
  });

  it('should apply the badge style', () => {
    mount(<Button title="Click me!" style="badge" />);
    cy.get('button').should('have.class', 'bg-amber-500');
  });

  it('should apply the link style', () => {
    mount(<Button title="Click me!" style="link" />);
    cy.get('button').should('have.class', 'text-indigo-600');
  });

  it('should apply additional class names', () => {
    mount(<Button title="Click me!" className="extra-class" />);
    cy.get('button').should('have.class', 'extra-class');
  });

  it('should be disabled when disabled prop is true', () => {
    mount(<Button title="Click me!" disabled={true} />);
    cy.get('button').should('be.disabled');
  });

  it('should show loading spinner when fetching is true', () => {
    mount(<Button title="Click me!" fetching={true} />);
    cy.get('button').find('svg.animate-spin').should('exist');
  });

  it('should call onClick when clicked', () => {
    const onClick = cy.stub();
    mount(<Button title="Click me!" onClick={onClick} />);
    cy.get('button').click();
    cy.wrap(onClick).should('have.been.called');
  });

  it('should not call onClick when disabled', () => {
    const onClick = cy.stub();
    mount(<Button title="Click me!" onClick={onClick} disabled />);
    cy.get('button').should('be.disabled');
  });

  it('should have the correct type attribute', () => {
    mount(<Button title="Click me!" type="submit" />);
    cy.get('button').should('have.attr', 'type', 'submit');
  });

  it('should have a data attribute set to "button-primary"', () => {
    mount(<Button title="Click me!" dataAttribute="button-primary" />);
    cy.get('button').should('have.attr', 'data-cy', 'button-primary');
  });
});
