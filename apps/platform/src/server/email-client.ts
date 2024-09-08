import 'server-only';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type Props = {
  email: string[];
  subject: string;
  html?: string;
};

export async function email({ email, subject, html }: Props) {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Conversion from cents to dollars
    // --------------------------------------------------------------------------------
    return await resend.emails.send({
      from: 'invoicio.io <info@invoicio.io>',
      to: email,
      subject,
      // react: EmailTemplate({ firstName: 'John' }),
      html: html ?? `<p>Email to: <strong>${email}</strong>!</p>`,
    });
  } catch (error) {
    console.error('📧 error', error);
    return { error };
  }
}
