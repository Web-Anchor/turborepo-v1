import { mount } from 'cypress/react18';
import { Sidebar } from './index';
import { Button } from '../Button';

const mainMenu = ['Home Link', 'About Link', 'Contact Link'];
const secondaryMenu = ['Link 1', 'Link 2', 'Link 3'];

describe('Sidebar Component', () => {
  beforeEach(() => {
    mount(
      <Sidebar
        navigation={mainMenu.map((item) => ({
          component: (
            <Button
              title={item}
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        }))}
        secondaryNavTitle="Secondary Navigation"
        secondaryNav={secondaryMenu.map((item) => ({
          component: (
            <Button
              title={item}
              style="link"
              onClick={() => {}}
              className="px-2 my-5"
            />
          ),
        }))}
        user={{
          name: 'User Profile',
          imageUrl: 'https://via.placeholder.com/150',
          linkUrl: 'https://via.placeholder.com/100',
        }}
        logoSrc={{
          imageUrl: 'https://via.placeholder.com/150',
        }}
      />
    );
    cy.viewport('iphone-6');
  });

  it('should open and close the mobile sidebar', () => {
    // Open sidebar
    cy.get('button[data-cy="Open sidebar"]').click();
    // cy.get('section').should('have.class', 'relative z-50 lg:hidden');
    cy.get('div[data-cy="Sidebar"]').should('be.visible');

    // Close sidebar
    cy.get('button[data-cy="Close sidebar"]').click();
    cy.get('div[data-cy="Sidebar"]').should('not.exist');
  });

  it('should display main navigation items', () => {
    cy.get('li[data-cy="Sidebar Main Navigation"]').should(
      'have.length',
      mainMenu?.length
    );

    //  li with data-cy="Sidebar Main Navigation" have to have text content
    cy.get('li[data-cy="Sidebar Main Navigation"]').each((item, index) => {
      cy.wrap(item).should('contain.text', mainMenu[index]);
    });
  });

  it('should display secondary navigation items', () => {
    cy.get('li[data-cy="Sidebar Secondary Navigation"]').should(
      'have.length',
      secondaryMenu?.length
    );

    //  li with data-cy="Sidebar Secondary Navigation" have to have text content
    cy.get('li[data-cy="Sidebar Secondary Navigation"]').each((item, index) => {
      cy.wrap(item).should('contain.text', secondaryMenu[index]);
    });
  });

  it('should display the user profile', () => {
    cy.get('a[data-cy="User Profile"]').should('contain.text', 'User Profile');
  });

  it('should display the logo', () => {
    cy.get('button[data-cy="Open sidebar"]').click();
    cy.get('a[data-cy="Logo Container"]').should('be.visible');

    cy.get('button[data-cy="Close sidebar"]').click();
    cy.get('a[data-cy="Logo Container"]').should('not.be.visible');
  });
});
