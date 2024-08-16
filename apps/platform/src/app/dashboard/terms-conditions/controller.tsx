'use client';

import { maxLength } from '@config/index';
import { useSupportTickets } from '@hooks/index';
import {
  Badge,
  Button,
  HeaderSection,
  Select,
  Wrapper,
} from '@repo/components';
import axios from 'axios';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

export default function Page() {
  const [state, setState] = useState<{ fetching?: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { count, isLoading } = useSupportTickets({});
  console.log(count, isLoading);

  return (
    <Wrapper>
      <HeaderSection
        title="Help & Support Form."
        description={[
          'Discover our Help & Support Center, where your queries are prioritized, and our team is dedicated to providing prompt responses to ensure your needs are addressed swiftly. Rest assured that your tickets are handled with urgency, and we strive to get back to you as soon as possible to offer the assistance you deserve. Please fill out the form below with your inquiry, and our support team will get back to you as soon as possible. Your satisfaction is our priority, and we are committed to providing you with the help you need.',
        ]}
        subtitle="Your Guide to Seamless Assistance."
        type="page-header"
      />
    </Wrapper>
  );
}
