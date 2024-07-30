import { mount } from 'cypress/react18';
import { Breadcrumb } from './index';

describe('Breadcrumb Component', () => {
  const pages = ['Projects', 'Project Nero'];

  beforeEach(() => {
    mount(
      <Breadcrumb
        components={pages.map((page) => (
          <a
            href="#"
            key={page}
            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            aria-current={page === pages[0] ? 'page' : undefined}
          >
            {page}
          </a>
        ))}
      />
    );
  });

  it('should display the Home icon and link', () => {
    cy.get('nav[data-cy="Breadcrumb"]').within(() => {
      cy.get('a[href="/"]')
        .first()
        .within(() => {
          cy.get('svg').should('have.class', 'h-5').and('have.class', 'w-5');
          cy.contains('Home').should('have.class', 'sr-only');
        });
    });
  });

  it('should render all the breadcrumb items', () => {
    cy.get('nav[data-cy="Breadcrumb"]').within(() => {
      cy.get('a').should('have.length', pages.length + 1);
    });
  });

  it('should render all the items titles', () => {
    cy.get('nav[data-cy="Breadcrumb"]').within(() => {
      pages.forEach((page) => {
        cy.contains(page);
      });
    });
  });

  it('should display breadcrumb items', () => {
    cy.get('nav[data-cy="Breadcrumb"]').within(() => {
      pages.forEach((page) => {
        cy.contains(page)
          .should('have.class', 'text-sm')
          .and('have.class', 'font-medium')
          .and('have.class', 'text-gray-500')
          .and('have.class', 'hover:text-gray-700');
      });
    });
  });

  it('should highlight the current page', () => {
    cy.get('nav[data-cy="Breadcrumb"]').within(() => {
      cy.contains(pages[0]).should('have.attr', 'aria-current', 'page');
    });
  });

  it('should contain ChevronRightIcon between breadcrumb items', () => {
    cy.get('nav[data-cy="Breadcrumb"]').within(() => {
      cy.get('svg').each(($el) => {
        cy.wrap($el).should('have.class', 'h-5').and('have.class', 'w-5');
      });
    });
  });
});
