import { mount } from 'cypress/react18';
import { TestimonialCard } from './index';

describe('TestimonialCard Component', () => {
  const mockProps = {
    body: 'This is a test testimonial. It has more than a few lines of text to ensure proper display and truncation.',
    author: {
      handle: 'johndoe',
      name: 'John Doe',
      imageUrl: 'https://picsum.photos/100',
    },
    timestamp: '2023-07-20',
    className: 'custom-class',
  };

  it('renders correctly with given props', () => {
    mount(<TestimonialCard {...mockProps} />);

    // Check if body text is rendered and truncated correctly
    cy.get('p').should('have.class', 'line-clamp-6');
    cy.get('[data-cy="body"]').should('have.text', `"${mockProps.body}"`);

    // Check if author name is rendered correctly
    cy.get('[data-cy="author"]').should(
      'have.class',
      'font-semibold text-gray-900'
    );
    cy.get('[data-cy="author"]').should('have.text', mockProps.author.name);

    // Check if author handle is rendered correctly
    cy.get('[data-cy="handle"]').should('have.class', 'text-gray-600');
    cy.get('[data-cy="handle"]').should(
      'have.text',
      `@${mockProps.author.handle}`
    );

    // Check if author image is rendered correctly
    cy.get('img').should('have.attr', 'src', mockProps.author.imageUrl);
    cy.get('img').should('have.attr', 'alt', mockProps.author.name);

    // Check if timestamp is rendered correctly
    cy.get('[data-cy="timestamp"]').should(
      'have.class',
      'text-gray-500 text-xs'
    );
    cy.get('[data-cy="timestamp"]').should('have.text', mockProps.timestamp);

    // Check if custom class is applied correctly
    cy.get('[data-cy="testimonial-card"]').should(
      'have.class',
      mockProps.className
    );
  });

  it('renders without the optional props', () => {
    const { body, author } = mockProps;
    mount(<TestimonialCard body={body} author={author} />);

    // Check if body text is rendered
    cy.get('p').should('have.text', `"${body}"`);

    // Check if author name is rendered
    cy.get('[data-cy="author"]').should('have.text', author.name);

    // Check if author handle is rendered
    cy.get('[data-cy="handle"]').should('have.text', `@${author.handle}`);

    // Check if author image is rendered
    cy.get('img').should('have.attr', 'src', author.imageUrl);
  });

  it('renders custom image component if provided', () => {
    const customImage = <div data-testid="custom-image">Custom Image</div>;
    mount(<TestimonialCard {...mockProps} imageComponent={customImage} />);

    // Check if custom image component is rendered
    cy.get('[data-testid="custom-image"]').should('exist');

    // Check if the default image is not rendered
    cy.get('img').should('not.exist');
  });
});
