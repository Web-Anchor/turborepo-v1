'use client';

import { HeaderSection, Wrapper } from '@repo/components';

export default function Page() {
  const conditions = [
    {
      description: <p className="text-xl font-bold">Introduction</p>,
    },
    {
      description: (
        <p>
          Welcome to invoicio.io, a comprehensive invoicing and payment
          management platform powered by Stripe. By using our services, you
          agree to comply with and be bound by the following terms and
          conditions. Please read these terms carefully before using our
          platform.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Acceptance of Terms</p>,
    },
    {
      description: (
        <p>
          By accessing or using our platform, you acknowledge that you have
          read, understood, and agree to be bound by these Terms & Conditions,
          as well as our Privacy Policy. If you do not agree with any part of
          these terms, you must not use our services.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Invoicing Portal</p>,
    },
    {
      description: (
        <p>
          Our customer portal provides tools for managing invoicing, including
          generating, viewing, downloading, and editing invoices. These services
          are designed to integrate seamlessly with Stripe, allowing for
          efficient and secure financial management.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Payment Link Generation</p>,
    },
    {
      description: (
        <p>
          We offer a feature to generate payment links using Stripe’s Payment
          Links API. This service enables users to create secure, customizable
          payment links for transactions, simplifying the payment collection
          process.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Analytics and Reporting</p>,
    },
    {
      description: (
        <p>
          Our platform leverages Stripe’s Charge and Customer APIs to provide
          advanced analytics, including revenue insights, charge trends, and
          customer growth metrics. These tools help users make informed
          decisions about their financial strategies.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Account Access</p>,
    },
    {
      description: (
        <p>
          Access to our platform requires a valid vendor API key, provided by
          the vendor with whom you conduct business. It is your responsibility
          to secure this key and follow any instructions provided by your vendor
          to access the platform.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Invoice Management</p>,
    },
    {
      description: (
        <p>
          You may view, download, and edit invoice billing details within the
          platform. It is your responsibility to ensure that any edits made to
          invoices are accurate and lawful, particularly regarding billing
          details such as contact information and notes. Unauthorized
          alterations to pricing or other critical invoice data are strictly
          prohibited.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Use of Payment Links</p>,
    },
    {
      description: (
        <p>
          When generating payment links, you agree to use these links solely for
          the purpose of collecting payments for goods or services you provide.
          Misuse of payment links, including fraudulent activities, will result
          in termination of your access to the platform.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Free Access</p>,
    },
    {
      description: (
        <p>
          Our customer portal is free to use for customers who have been
          provided access by their vendor. No additional charges are incurred
          for using the invoicing or payment link generation features, unless
          explicitly stated.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Availability</p>,
    },
    {
      description: (
        <p>
          We strive to provide continuous access to our platform; however, we do
          not guarantee that the platform will always be available or free from
          interruptions. Scheduled maintenance and updates may result in
          temporary unavailability.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Security</p>,
    },
    {
      description: (
        <p>
          We are committed to maintaining the security of your financial data.
          Our platform uses advanced encryption and adheres to industry
          standards to protect your information. However, you are responsible
          for safeguarding your account credentials and any sensitive data you
          upload or access on our platform.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">General Limitation</p>,
    },
    {
      description: (
        <p>
          We shall not be liable for any indirect, incidental, special, or
          consequential damages, including but not limited to loss of profits,
          revenue, data, or use, incurred by you or any third party, arising
          from your use of the platform.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Accuracy of Information</p>,
    },
    {
      description: (
        <p>
          While we strive to ensure the accuracy of the information and tools
          provided by our platform, we do not guarantee that the platform will
          be error-free or that any defects will be corrected.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Intellectual Property</p>,
    },
    {
      description: (
        <p>
          All content, trademarks, and other intellectual property associated
          with the platform are owned by invoicio.io or its licensors.
          Unauthorized use of any content or intellectual property on the
          platform is strictly prohibited.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Termination</p>,
    },
    {
      description: (
        <p>
          We reserve the right to terminate or suspend your access to the
          platform at our discretion, without notice, if we believe you have
          violated these Terms & Conditions or engaged in unauthorized
          activities.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Amendments</p>,
    },
    {
      description: (
        <p>
          We may update these Terms & Conditions from time to time. Any changes
          will be posted on this page, and it is your responsibility to review
          these terms regularly. Continued use of the platform after changes are
          posted constitutes your acceptance of the amended terms.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Governing Law</p>,
    },
    {
      description: (
        <p>
          These Terms & Conditions are governed by and construed in accordance
          with the laws of UK. Any disputes arising out of or related to these
          terms shall be resolved in the courts of UK.
        </p>
      ),
    },
    {
      description: <p className="text-xl font-bold">Contact Information</p>,
    },
    {
      description: (
        <p>
          If you have any questions or concerns about these Terms & Conditions,
          please contact us at{' '}
          <span className="text-blue-600">info@invoicio.io</span>
        </p>
      ),
    },
  ];

  return (
    <Wrapper>
      <HeaderSection
        subtitle="T & C"
        title="Terms & Conditions"
        description={conditions?.map((condition) => condition.description)}
        type="page-header"
      />
    </Wrapper>
  );
}
