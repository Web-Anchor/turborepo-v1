import { HeaderSection, Wrapper } from '@repo/components';

export default function Page() {
  return (
    <Wrapper>
      <HeaderSection
        title="Customer Portal."
        description={[
          'Discover our customer portal, designed to provide a seamless experience for users to access and download their purchase invoices. Learn more about how our portal simplifies invoicing processes and enhances customer convenience.',
        ]}
        subtitle="Empowering Your Financial Journey!"
      />

      <HeaderSection
        className="text-justify"
        description={[
          'Our customer portal is your gateway to easily access and download your purchase invoices for past transactions. Designed to streamline your invoicing experience, our portal offers a convenient solution for managing your financial documents. Explore the features that make our portal the go-to platform for simplifying your billing processes.',
        ]}
      />
      <HeaderSection
        description={[
          "Our customer portal is more than just a platform for downloading purchase invoices - it's a comprehensive tool designed to elevate your financial management experience. With user-friendly navigation and intuitive features, our portal offers a seamless way for you to track and access your past transactions effortlessly. Whether you're a busy entrepreneur or a meticulous shopper, our portal provides a centralized hub for all your invoicing needs.",
        ]}
      />
      <HeaderSection
        description={[
          'At the core of our customer portal is a commitment to simplifying complex billing processes and empowering you with the tools to manage your financial documents efficiently. From detailed transaction histories to easy-to-navigate interfaces, we prioritize user experience to ensure that accessing and downloading your purchase invoices is a hassle-free task. With our portal, you can stay organized, track payments, and gain valuable insights into your spending patterns.',
        ]}
      />
      <HeaderSection
        description={[
          'We understand the importance of transparency and accessibility when it comes to managing financial records. Our customer portal not only offers a secure environment for document retrieval but also serves as a reliable resource for keeping track of your purchase history. Whether you need to download invoices for accounting purposes or simply want to stay informed about your past purchases, our portal is here to support you every step of the way.',
        ]}
      />
    </Wrapper>
  );
}
