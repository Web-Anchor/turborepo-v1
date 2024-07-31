import { mount } from 'cypress/react18';
import { useVerticalScroll } from './useVerticalScroll';
import React from 'react';

const TestComponent = () => {
  const { scrollDirection, scrollDistance } = useVerticalScroll({
    onScrollUp: (distance) => console.log(`Scrolled Up ${distance}px`),
    onScrollDown: (distance) => console.log(`Scrolled Down ${distance}px`),
    onScrollEnd: () => console.log('Scrolled to End'),
  });

  return (
    <div style={{ height: '200vh', padding: '1rem' }}>
      <h1>Scroll down to trigger events</h1>
      <p data-cy="scroll-direction">Scroll Direction: {scrollDirection}</p>
      <p data-cy="scroll-distance">
        Total Scroll Distance:{' '}
        <span data-cy="scroll-amount">{scrollDistance}</span>px
      </p>
    </div>
  );
};

describe('useVerticalScroll hook e2e tests', () => {
  beforeEach(() => {
    mount(<TestComponent />);
    cy.viewport('macbook-13');
  });

  it('should display scroll direction and distance', () => {
    cy.get('[data-cy=scroll-direction]').should(
      'have.text',
      'Scroll Direction: '
    );
    cy.get('[data-cy=scroll-distance]').should(
      'have.text',
      'Total Scroll Distance: 0px'
    );
  });

  it('should display scroll direction and distance when scrolling down', () => {
    cy.scrollTo(0, 200);
    cy.get('[data-cy=scroll-direction]').should(
      'have.text',
      'Scroll Direction: down'
    );
    cy.get('[data-cy=scroll-distance]').should(
      'have.text',
      'Total Scroll Distance: 200px'
    );
  });

  it('should display scroll direction and distance when scrolling up', () => {
    cy.scrollTo(0, 200);
    cy.wait(100);
    cy.scrollTo(0, 0);
    cy.wait(100);

    cy.get('[data-cy=scroll-direction]').should(
      'have.text',
      'Scroll Direction: up'
    );
    cy.get('[data-cy=scroll-amount]').should(($el) => {
      const scrollDistance = parseInt($el.text(), 10);
      expect(scrollDistance).to.be.greaterThan(0);
    });

    cy.get('[data-cy=scroll-distance]').should(
      'have.text',
      'Total Scroll Distance: 400px'
    );
  });
});
