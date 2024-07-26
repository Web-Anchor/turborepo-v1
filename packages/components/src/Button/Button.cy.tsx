import { Button } from './index'; // Adjust the import based on your component structure
import { mount } from 'cypress/react18';

describe('Button Component', () => {
  it('should display a title', () => {
    mount(<Button title="Primary CTA" type="button" style="primary" />);
    cy.get('button').should('contain.text', 'Primary CTA');
  });

  it('should have a data attribute', () => {
    mount(<Button dataAttr="button-primary" />);
    cy.get('button').should('have.attr', 'data-cy', 'button-primary');
  });
});
