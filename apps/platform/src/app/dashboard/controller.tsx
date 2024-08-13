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
import FrameCard from '@components/FrameCard';
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
            className="mx-auto rounded-md bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <p className="text-center">Visit Customer Portal</p>
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
