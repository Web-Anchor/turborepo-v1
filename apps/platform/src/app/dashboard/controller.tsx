'use client';

import { useSubscription, useUser } from '@hooks/index';
import Pricing from '@components/Pricing';
import { useStatistics } from '@hooks/index';
import StatsCard from '@components/StatsCard';
import { copyToClipboard, currentMonth, lastMonth } from '@helpers/index';
import NumbersCard from '@components/NumbersCard';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fakerStatsCharges } from '@lib/faker';
import RateForm from '@components/RateForm';
import { Badge, Button, HeaderSection, Wrapper } from '@repo/components';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const { user } = useUser({});
  const { subscription, isLoading } = useSubscription({});
  let { charges, customers } = useStatistics({
    type: 'advanced',
  });
  // charges = fakerStatsCharges(); // faker data

  if (!subscription && !isLoading) {
    // --------------------------------------------------------------------------------
    // 📌  Fallback Component if no subscription
    // --------------------------------------------------------------------------------
    return (
      <Wrapper>
        <HeaderSection
          title="Subscribe to a Plan to Access the Platform and Its Features"
          description="Subscribe to a plan to access the platform and its features. Choose a plan that suits your needs and budget to get started."
          subtitle="Invoicio.io - Empowering Your Business!"
          type="page-header"
        />
        <Pricing hideTiers={['Enterprise']} />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="max-w-6xl">
      <HeaderSection
        title="Dashboard. Your Central Hub for Insights and Control."
        description="Access real-time data, analytics, and key metrics on our Dashboard, empowering you with valuable insights to make informed decisions. Monitor performance, track trends, and stay in control of your operations from a centralized platform designed to streamline your workflow."
        subtitle="Invoice Smarter, Grow Stronger - Empowering Your Business!"
        type="page-header"
      />

      {!isLoading && (
        <Wrapper>
          <Badge
            title={
              <p>
                <span className="text-indigo-600">invoicio.io</span> API key
              </p>
            }
            type="info"
            tooltip={`My invoicio.io API key: ${user?.id}. API key is used to access invoicio.io customer portal charges & invoices.`}
            tooltipPosition="tooltip-bottom"
            description={
              <section className="flex flex-row gap-5 content-center justify-center">
                <Button
                  title={`Copy API Key: ${user?.id}`}
                  style="ghost"
                  onClick={() => {
                    copyToClipboard(user?.id!);
                    toast.success('API key copied to clipboard');
                  }}
                />
              </section>
            }
          />

          <Link
            href={process.env.NEXT_PUBLIC_PORTAL_URL!}
            target="_blank"
            className="flex gap-5 items-center justify-center h-24 bg-gradient-to-r from-amber-500 to-pink-500 rounded-2xl bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <p className="text-3xl lg:text-6xl font-bold text-center">
              Visit Customer Portal
            </p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 lg:h-12 lg:w-12 flex-shrink-0 self-center"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{' '}
                <path
                  d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{' '}
              </g>
            </svg>
          </Link>

          <HeaderSection
            title="Provide your customers with easy access to their invoices through
              a dedicated portal."
            description={[
              'Enhance your customer experience with our dedicated Customer Portal. Your customers can effortlessly access and download their invoices at their convenience, 24/7. Simplify their billing process and build stronger relationships with a seamless, user-friendly interface designed for their needs.',
              'Your API key to access invoicio.io customer portal. This API key will be automatically send to your customers and will be needed to access invoices on a customer portal.',
            ]}
            subtitle="Customer Portal."
            type="page-header"
          />
          <HeaderSection description={[]} />
        </Wrapper>
      )}

      <Wrapper className="flex-row flex-wrap gap-5">
        <StatsCard
          currentTotal={charges?.totalCurrentCharges}
          previousTotal={`${charges?.totalLastMonthCharges} prev`}
          percentage={charges?.chargesPercentageGrowth}
          type="payments"
          title="Payments"
          link="/dashboard/charges"
          description={currentMonth()}
          isLoading={isLoading}
        />
        <StatsCard
          currentTotal={charges?.revenueCurrentMonth}
          previousTotal={`${charges?.revenueLastMonth} prev`}
          percentage={charges?.revenueGrowthRate}
          type="payments"
          title="Revenue"
          link="/dashboard/charges"
          description={currentMonth()}
          isLoading={isLoading}
        />
        <NumbersCard
          number={customers?.customersTotal}
          icon="customers"
          title="Total Customers"
          subDescription="Total Number of Customers"
          isLoading={isLoading}
        />
        <NumbersCard
          number={charges?.avgRevenuePerUserCurrentMonth}
          icon="customers"
          title="Current Month (RPC)"
          description={currentMonth()}
          subDescription="Revenue per Customer (RPC)"
          about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
          isLoading={isLoading}
        />
        <NumbersCard
          number={charges?.avgRevenuePerUserLastMonth}
          icon="customers"
          title="Previous Month (RPC)"
          description={lastMonth()}
          subDescription="Revenue per Customer (RPC)"
          about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
          isLoading={isLoading}
        />
        <NumbersCard
          number={charges?.totalCurrentSuccessfulCharges}
          icon="payments"
          title="Current Transactions"
          description={currentMonth()}
          subDescription="Total Successful Transactions"
          isLoading={isLoading}
        />
      </Wrapper>

      <section>
        <Button
          title="View All Statistics & Reports"
          style="link"
          onClick={() => router.push('/dashboard/reports')}
          className="mt-10"
        />
      </section>

      {!isLoading && <RateForm />}
    </Wrapper>
  );
}
