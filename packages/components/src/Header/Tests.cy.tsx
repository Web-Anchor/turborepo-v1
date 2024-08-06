import { mount } from 'cypress/react18';
import { Header } from './index';

const menu = ['Home', 'About', 'Services', 'Contact'];

describe('Header Component mobile UI e2e. iPhone-6', () => {
  beforeEach(() => {
    mount(
      <Header
        logo={
          <div className="flex lg:flex-1">
            <div className="text-gray-800 font-bold bg-indigo-300 p-2 rounded-lg">
              Logo
            </div>
          </div>
        }
        menuList={menu.map((item) => (
          <button key={item} className="text-gray-800 font-bold">
            {item}
          </button>
        ))}
        callsToAction={[
          <div className="flex gap-5">
            <button className="text-gray-800 font-bold bg-indigo-300 p-2 rounded-lg">
              Sign In
            </button>
            <button className="text-gray-800 font-bold">Sign Up</button>
          </div>,
        ]}
        className="bg-slate-200"
        footer={
          <div className="flex justify-center text-gray-800 font-bold">
            &copy; 2021
          </div>
        }
      />
    );

    cy.viewport('iphone-6'); // Adjust to the desired mobile viewport
  });

  it('opens and closes the mobile menu', () => {
    // Open the sidebar
    cy.get('[data-cy="open-sidebar"]').click();
    cy.get('[data-cy="close-sidebar"]').should('exist');

    // Close the sidebar
    cy.get('[data-cy="close-sidebar"]').click();
    cy.get('[data-cy="close-sidebar"]').should('not.exist');
  });

  it('displays the logo correctly', () => {
    // logo exists on main view
    cy.get('[data-cy="logo-container"]').should('exist');

    // logo exits when sidebar is open
    cy.get('[data-cy="open-sidebar"]').click();
    cy.get('[data-cy="logo-container"]').should('exist');
    cy.get('[data-cy="close-sidebar"]').click();
  });

  it('displays menu items all list of menu in mobile view', () => {
    cy.get('[data-cy="open-sidebar"]').click();
    cy.get('[data-cy="mobile-menu"]').should('exist');

    menu.forEach((item) => {
      cy.contains(item).should('exist');
    });
    cy.get('[data-cy="close-sidebar"]').click();
  });

  it('displays calls to cta in mobile view', () => {
    cy.get('[data-cy="open-sidebar"]').click();
    cy.get('[data-cy="mobile-cta"]').should('exist');
    cy.get('[data-cy="close-sidebar"]').click();
  });

  it('displays calls to footer in mobile view', () => {
    cy.get('[data-cy="open-sidebar"]').click();
    cy.get('[data-cy="footer"]').should('exist');
    cy.get('[data-cy="close-sidebar"]').click();
  });
});

// mac-13 ui tests
describe('Header Component mobile UI e2e. mac-13', () => {
  beforeEach(() => {
    mount(
      <Header
        logo={
          <div className="flex lg:flex-1">
            <div className="text-gray-800 font-bold bg-indigo-300 p-2 rounded-lg">
              Logo
            </div>
          </div>
        }
        menuList={menu.map((item) => (
          <button key={item} className="text-gray-800 font-bold">
            {item}
          </button>
        ))}
        callsToAction={[
          <div className="flex gap-5">
            <button className="text-gray-800 font-bold bg-indigo-300 p-2 rounded-lg">
              Sign In
            </button>
            <button className="text-gray-800 font-bold">Sign Up</button>
          </div>,
        ]}
        className="bg-slate-200"
        footer={
          <div className="flex justify-center text-gray-800 font-bold">
            &copy; 2021
          </div>
        }
      />
    );

    cy.viewport('macbook-13'); // Adjust to the desired mobile viewport
  });

  it('displays the logo correctly', () => {
    // logo exists on main view
    cy.get('[data-cy="logo-container"]').should('exist');
  });

  it('displays menu items all list of menu in mobile view', () => {
    cy.get('[data-cy="desktop-menu"]').should('exist');

    menu.forEach((item) => {
      cy.contains(item).should('exist');
    });
  });

  it('displays calls to cta in desktop view', () => {
    cy.get('[data-cy="desktop-cta"]').should('exist');
  });
});
