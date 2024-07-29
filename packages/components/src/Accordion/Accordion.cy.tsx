import { mount } from 'cypress/react18';
import { Accordion } from './index';

describe('Accordion Component', () => {
  const items = [
    {
      title: 'How does TailwindCSS works?',
      body: 'Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for className names, generating the corresponding styles and then writing them to a static CSS file.',
      open: true,
      dataAttr: 'item1',
    },
    {
      title: 'How do I install TailwindCSS?',
      body: 'The simplest and fastest way to get up and running with Tailwind CSS from scratch is with the Tailwind CLI tool. The CLI is also available as a standalone executable if you want to use it without installing Node.js. Install tailwindcss via npm, and create your tailwind.config.js file.',
      open: false,
      dataAttr: 'item2',
    },
    {
      title: 'What is Wind UI about?',
      body: 'Expertly made, responsive, accessible components in React and HTML ready to be used on your website or app. Just copy and paste them on your Tailwind CSS project.',
      open: false,
      dataAttr: 'item3',
    },
    {
      title: 'How do I use Wind UI components?',
      body: 'All components can be copied and pasted and easily implemented in your tailwind css projects. You can choose which language you want to copy the desired component and just hover and click on the component you need and paste it on your project.',
      open: false,
      dataAttr: 'item4',
    },
  ];

  beforeEach(() => {
    mount(<Accordion items={items} />);
  });

  it('renders all accordion items', () => {
    items.forEach((item, index) => {
      cy.get(`details[data-attr=${item.dataAttr}] summary`).should(
        'contain.text',
        item.title
      );
      if (item.open) {
        cy.get(`details[data-attr=${item.dataAttr}]`).should(
          'have.attr',
          'open'
        );
        cy.get(`details[data-attr=${item.dataAttr}] p`).should('be.visible');
      } else {
        cy.get(`details[data-attr=${item.dataAttr}]`).should(
          'not.have.attr',
          'open'
        );
        cy.get(`details[data-attr=${item.dataAttr}] p`).should(
          'not.be.visible'
        );
      }
    });
  });

  it('toggles accordion items on summary click', () => {
    items.forEach((item, index) => {
      const summaryElement = cy.get(
        `details[data-attr=${item.dataAttr}] summary`
      );

      // Click to close if initially open
      if (item.open) {
        summaryElement.click();
        cy.get(`details[data-attr=${item.dataAttr}]`).should(
          'not.have.attr',
          'open'
        );
        cy.get(`details[data-attr=${item.dataAttr}] p`).should(
          'not.be.visible'
        );
      }

      // Click to open if initially closed
      summaryElement.click();
      cy.get(`details[data-attr=${item.dataAttr}]`).should('have.attr', 'open');
      cy.get(`details[data-attr=${item.dataAttr}] p`).should('be.visible');
    });
  });

  it('accordion item toggles on subsequent clicks', () => {
    const index = 1; // Test the second item as it's initially closed
    const summaryElement = cy.get(
      `details[data-attr=${items[index].dataAttr}] summary`
    );

    // Initially closed
    cy.get(`details[data-attr=${items[index].dataAttr}] p`).should(
      'not.be.visible'
    );

    // Click to open
    summaryElement.click();
    cy.get(`details[data-attr=${items[index].dataAttr}] p`).should(
      'be.visible'
    );

    // Click to close again
    summaryElement.click();
    cy.get(`details[data-attr=${items[index].dataAttr}] p`).should(
      'not.be.visible'
    );
  });
});
