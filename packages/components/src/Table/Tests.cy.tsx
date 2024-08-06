import { mount } from 'cypress/react18';
import { Table } from './index';

describe('Table Component', () => {
  const header = [
    { item: 'Column 1', className: 'class-1' },
    { item: 'Column 2', className: 'class-2' },
  ];
  const data = [
    {
      row: [
        { item: 'Row 1, Cell 1', className: 'class-a' },
        { item: 'Row 1, Cell 2', className: 'class-b' },
      ],
      className: 'row-class-1',
    },
    {
      row: [
        { item: 'Row 2, Cell 1', className: 'class-a' },
        { item: 'Row 2, Cell 2', className: 'class-b' },
      ],
      className: 'row-class-2',
    },
  ];

  it('renders the table with header and data', () => {
    mount(<Table header={header} data={data} />);

    // Check for headers
    header.forEach((col) => {
      cy.contains(col.item).should('exist');
    });

    // Check for rows and cells
    data.forEach((row) => {
      row.row.forEach((cell) => {
        cy.contains(cell.item).should('exist');
      });
    });
  });

  it('shows skeleton while fetching', () => {
    mount(<Table fetching={true} />);
    cy.get('[data-cy="table-skeleton"]').should('exist');
  });

  it('renders no data component when no data is available', () => {
    mount(
      <Table
        data={[]}
        noData={{ title: 'No Data', description: 'No data available.' }}
      />
    );
    cy.contains('No Data').should('exist');
    cy.contains('No data available.').should('exist');
  });

  it('renders previous and next buttons', () => {
    mount(<Table hasPrevious={true} hasMore={true} />);
    cy.contains('Previous').should('exist');
    cy.contains('Next').should('exist');
  });

  it('triggers callbacks on button click', () => {
    const prevCallback = cy.stub();
    const nextCallback = cy.stub();
    mount(
      <Table
        hasPrevious={true}
        hasMore={true}
        prevCallback={prevCallback}
        nextCallback={nextCallback}
      />
    );

    cy.contains('Previous').click();
    cy.contains('Next').click();

    cy.wrap(prevCallback).should('be.calledOnce');
    cy.wrap(nextCallback).should('be.calledOnce');
  });

  it('hides the table when hidden is true', () => {
    mount(<Table hidden={true} />);
    cy.get('table').should('not.exist');
  });

  it('renders footer if provided', () => {
    const footer = <div data-testid="footer">Footer content</div>;
    mount(<Table footer={footer} />);
    cy.get('[data-testid="footer"]').should('exist').contains('Footer content');
  });
});
