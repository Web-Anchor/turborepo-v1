'use client';

import StatsCard from '@components/StatsCard';
import NumbersCard from '@components/NumbersCard';
import { useStatistics } from '@hooks/index';
import { currentMonth, last7Days, lastMonth } from '@helpers/index';
import { fakerStatsCharges, fakerStatsCustomers } from '@lib/faker';
import { HeaderSection, Wrapper } from '@repo/components';

export default function Page() {
  let { charges, customers, isLoading } = useStatistics({
    type: 'advanced',
  });
  // customers = fakerStatsCustomers(); // faker data
  // charges = fakerStatsCharges(); // faker data

  return (
    <Wrapper>
      <HeaderSection
        title="Reports Hub. Gain Insights, Drive Decisions."
        description="Explore comprehensive reports and analytics on our Reports page to gain valuable insights into your financial data. Track performance metrics, monitor trends, and make informed decisions to drive your business forward. Leverage data-driven insights to optimize your strategies and achieve success."
        subtitle="Informed Decisions, Thriving Business - Your Data, Your Power!"
        type="page-header"
      />

      <HeaderSection
        title="Revenue Explorer"
        description=" Dive into detailed revenue analytics, transaction trends, and payment performance metrics with our Charges Insights Module. Unlock valuable insights into your financial data to optimize revenue streams and drive business growth."
        subtitle="Navigate Revenue Waters, Chart Your Success!"
        type="page-header"
      />
      <Wrapper className="lg:flex-row flex-wrap gap-5">
        <StatsCard
          currentTotal={charges?.totalCurrentCharges}
          previousTotal={`${charges?.totalLastMonthCharges} prev`}
          percentage={charges?.chargesPercentageGrowth}
          type="payments"
          title="Payments"
          link="/dashboard/charges"
          linkTitle="Charges"
          description={currentMonth()}
        />
        <StatsCard
          currentTotal={charges?.revenueCurrentMonth}
          previousTotal={`${charges?.revenueLastMonth} prev`}
          percentage={charges?.revenueGrowthRate}
          type="payments"
          title="Revenue"
          link="/dashboard/charges"
          linkTitle="Charges"
          description={currentMonth()}
        />
        <StatsCard
          currentTotal={charges?.totalCurrentCharges}
          previousTotal={`${charges?.totalLastMonthCharges} prev`}
          percentage={charges?.chargesPercentageGrowth}
          type="payments"
          title="Transactions"
          link="/dashboard/charges"
          linkTitle="Charges"
          description={currentMonth()}
        />
      </Wrapper>

      <Wrapper className="lg:flex-row flex-wrap gap-5">
        <StatsCard
          currentTotal={customers?.customersTotalCurrentMonth}
          previousTotal={`${customers?.customersTotalLastMonth} prev`}
          percentage={customers?.customersPercentageGrowth}
          type="customers"
          title="Customer Growth Rate"
          link="/dashboard/customers"
          linkTitle="Customers"
          description={currentMonth()}
        />
        <NumbersCard
          number={customers?.customersTotal}
          icon="customers"
          title="Total Customers"
          subDescription="Total Number of Customers"
        />
        <NumbersCard
          number={customers?.useCustomersCurrentMonthGrowth}
          icon="customers"
          title="Customer Growth Rate"
          description={lastMonth()}
          subDescription="Customer Growth Rate"
        />
      </Wrapper>

      <HeaderSection
        title="Customer Pulse"
        description="Visualize key metrics from Stripe charges and customers API data in an easy-to-understand format with our Basic Charts Component. Gain insights into revenue trends, customer behavior, and payment performance at a glance."
        subtitle="Simplify Insights, Drive Growth - Charting Your Success!"
        type="page-header"
      />

      <Wrapper className="lg:flex-row flex-wrap gap-5 lg:mb-10">
        <NumbersCard
          number={customers?.customersLast7Days}
          icon="customers"
          title="Customers Last 7 Days"
          description={last7Days()}
          subDescription="Total Number of Customers"
        />
        <NumbersCard
          number={customers?.customersTotalCurrentMonth}
          icon="customers"
          title="Current Month Customers Growth"
          description={currentMonth()}
          subDescription="Total Number of Customers"
        />
        <NumbersCard
          number={customers?.customersTotalLastMonth}
          icon="customers"
          title="Last Month Customers Growth"
          description={lastMonth()}
          subDescription="Total Number of Customers"
        />
      </Wrapper>
    </Wrapper>
  );
}

// Charges Insights Module
// Name: Revenue Explorer
// Description: Dive into detailed revenue analytics, transaction trends, and payment performance metrics with our Charges Insights Module. Unlock valuable insights into your financial data to optimize revenue streams and drive business growth.
// Slogan: "Navigate Revenue Waters, Chart Your Success!"

// Customers Insights Module
// Name: Customer Pulse
// Description: Get a pulse on customer behavior, lifetime value trends, and acquisition insights with our Customers Insights Module. Understand your customer base better, segment effectively, and enhance retention strategies for sustainable growth.
// Slogan: "Connecting with Customers, Growing Together!"
