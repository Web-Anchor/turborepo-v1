import { mount } from 'cypress/react18';
import { HeaderSection } from './index';

describe('SupportCenter Component', () => {
  it('renders the title, subtitle, and description', () => {
    const title = 'Support center';
    const subtitle = 'Get the help you need';
    const description =
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.';

    mount(
      <HeaderSection
        title={title}
        subtitle={subtitle}
        description={[description]}
      />
    );

    cy.get('h1').should('have.text', title);
    cy.get('h2').should('have.text', subtitle);
    cy.get('p').should('have.text', description);
  });

  it('renders the title and subtitle', () => {
    const title = 'Support center';
    const subtitle = 'Get the help you need';

    mount(<HeaderSection title={title} subtitle={subtitle} />);

    cy.get('h1').should('have.text', title);
    cy.get('h2').should('have.text', subtitle);
  });

  it('renders the title only', () => {
    const title = 'Support center';

    mount(<HeaderSection title={title} />);

    cy.get('h1').should('have.text', title);
  });

  it('renders the subtitle only', () => {
    const subtitle = 'Get the help you need';

    mount(<HeaderSection subtitle={subtitle} />);

    cy.get('h2').should('have.text', subtitle);
  });

  // dark theme support
  it('applies dark theme to component', () => {
    const title = 'Support center';
    const subtitle = 'Get the help you need';
    const description =
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.';

    mount(
      <HeaderSection
        title={title}
        subtitle={subtitle}
        description={[description]}
        theme="dark"
      />
    );

    //  have class bg-gray-800
    cy.get('div').should('have.class', 'bg-gray-800');
    cy.get('h1').should('have.class', 'text-white');
    cy.get('h2').should('have.class', 'text-indigo-400');
    cy.get('p').should('have.class', 'text-gray-200');
  });
});
