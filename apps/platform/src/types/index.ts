export type Charge = {
  id?: string;
  amount?: number;
  application?: string;
  billing_details?: {
    address?: Address;
    email?: string;
    name?: string;
    phone?: string;
  };
  calculated_statement_descriptor?: string;
  created?: number;
  currency?: string;
  customer?: Customer;
  description?: string;
  receipt_url?: string;
  status?: string;
  paid?: boolean;
};

type Address = {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
};

export type Customer = {
  id?: string;
  address?: Address;
  balance?: number;
  created?: number;
  name?: string;
  email?: string;
  currency?: string;
  // TODO: Add more fields
};

export type StripeKey = {
  id?: string;
  name?: string;
  userId?: string;
  restrictedAPIKey?: string;
  createdAt?: string;
};

export type User = {
  id?: string;
  clerkId?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  createdAt?: string;
  stripeSubId?: string;
  emailsSendCount?: string;
  lastEmailSendDate?: string;
  imageUrl?: string;
};

export type Template = {
  id?: string | null;
  header?: string | null;
  invoiceNumber?: string | null;
  date?: string | null;
  companyName?: string | null;
  imgUrl?: string | null;
  billToName?: string | null;
  billToEmail?: string | null;
  billToPhone?: string | null;
  billToAddress?: string | null;
  billToAddressLine1?: string | null;
  billToAddressLine2?: string | null;
  billToCity?: string | null;
  billToState?: string | null;
  billToPostalCode?: string | null;
  billToCountry?: string | null;
  customFields?: { [key: number]: CustomField } | null;
  memo?: string | null;
  items?: {
    description?: string | null;
    amount?: string | number | null;
    quantity?: number | string | null;
    units?: string | number;
  }[];
  dueDate?: string | null;
  subtotal?: string | null;
  tax?: string | null;
  total?: string | null;
  footer?: string | null;
};

export type CustomField = {
  value: string;
};

export type StripeSubscription = {
  id?: string;
  customer?: string;
  items?: {
    data?: {
      price?: {
        id?: string;
        active?: boolean;
        currency?: string;
        product?: string;
        unit_amount?: number;
      };
    }[];
  };
  status?: string;
  current_period_end?: number;
  current_period_start?: number;
  created?: number;
  ended_at?: number;
  latest_invoice?: string;
  start_date?: number;
  plan?: {
    id?: string;
    nickname?: string;
    amount?: number;
    currency?: string;
  };
  currency?: string;
};

export type Plan = {
  keyLimit: number;
  name: string;
  basic: boolean;
  advanced: boolean;
  pro: boolean;
  emailCap?: number;
  invoiceEmailCap?: number;
};

export type Ticket = {
  id?: string;
  userId?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Feature = {
  id?: string;
  userId?: string;
  featureName?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type StripeProduct = {
  id?: string;
  name?: string;
  description?: string;
  active?: boolean;
  created?: number;
};

export type Testimonials = {
  id?: string;
  rating?: string;
  comments?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  platform?: string;
  createdAt?: string;
};

export type Component = {
  id?: string;
  type?: string | null;
  title?: string | null;
  slogan?: string | null;
  description?: string | null;
  userId?: string | null;
  link?: string | null;
  createdAt?: string | null;
};
