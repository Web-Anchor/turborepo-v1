import { mount } from 'cypress/react18';
import { Footer } from './index';

const links = ['Home', 'About', 'Services', 'Contact'];
const socials = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
const copy = '2024 Your Company. All rights reserved.';

describe('Footer Component', () => {
  beforeEach(() => {
    mount(
      <Footer
        copy={<p>{copy}</p>}
        links={
          <>
            {links.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {link}
              </a>
            ))}
          </>
        }
        socialMedia={
          <>
            {socials.map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                className="text-gray-600 hover:text-gray-900"
              >
                {social}
              </a>
            ))}
          </>
        }
        className="custom-css-class"
      />
    );
  });

  it('renders the footer copy', () => {
    cy.contains(copy).should('be.visible');
  });

  it('renders the links', () => {
    links.forEach((link) => {
      cy.contains(link)
        .should('be.visible')
        .and('have.attr', 'href', `/${link.toLowerCase()}`);
    });
  });

  it('renders the social media links', () => {
    socials.forEach((social) => {
      cy.contains(social)
        .should('be.visible')
        .and('have.attr', 'href', `https://${social.toLowerCase()}.com`);
    }
  });

  it('applies custom CSS class', () => {
    cy.get('footer').should('have.class', 'custom-css-class');
  });

  it('renders the footer', () => {
    cy.get('footer').should('be.visible');
  });
});
