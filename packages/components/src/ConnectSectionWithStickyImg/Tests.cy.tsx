// connectSectionWithStickyImg.cy.tsx

import { mount } from 'cypress/react18';
import { ConnectSectionWithStickyImg } from './index';

describe('ConnectSectionWithStickyImg e2e tests', () => {
  const header = {
    title: 'A better workflow',
    subtitle: 'Deploy faster',
    description: [
      'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.',
    ],
  };

  const footer = {
    title: 'No server? No problem.',
    description: [
      'Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris.',
    ],
  };

  const perks = [
    {
      title: 'Push to deploy',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    },
    {
      title: 'SSL certificates',
      description:
        'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    },
    {
      title: 'Database backups',
      description:
        'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    },
  ];

  const image = (
    <img
      src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
      alt="Project Screenshot"
      className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
    />
  );

  beforeEach(() => {
    mount(
      <ConnectSectionWithStickyImg
        header={header}
        footer={footer}
        perks={perks}
        image={image}
        theme="light"
      />
    );
  });

  it('should display the hero section with correct text', () => {
    cy.contains('Deploy faster').should('be.visible');
    cy.contains('A better workflow').should('be.visible');
    cy.contains(
      'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.'
    ).should('be.visible');
  });

  it('should display the image section', () => {
    cy.get('img').should(
      'have.attr',
      'src',
      'https://tailwindui.com/img/component-images/dark-project-app-screenshot.png'
    );
  });

  it('should display perks with correct icons and text', () => {
    cy.contains('Push to deploy').should('be.visible');
    cy.contains(
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.'
    ).should('be.visible');

    cy.contains('SSL certificates').should('be.visible');
    cy.contains(
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.'
    ).should('be.visible');

    cy.contains('Database backups').should('be.visible');
    cy.contains(
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.'
    ).should('be.visible');
  });

  it('should display the footer section with correct text', () => {
    cy.contains('No server? No problem.').should('be.visible');
    cy.contains(
      'Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris.'
    ).should('be.visible');
  });
});
