'use server';

import Handlebars from 'handlebars';
import axios from 'axios';

export async function buildTemplate(props: {
  data: object;
  template: string;
}): Promise<string> {
  try {
    const template = Handlebars.compile(props.template);

    return template(props.data);
  } catch (error: any) {
    console.error('🚨 error', error?.message);
    return '';
  }
}

type GetTemplate = {
  templateName:
    | 'template-one.hbs'
    | 'template-two.hbs'
    | 'email-template-one.hbs';
};

export async function getTemplate(props: GetTemplate): Promise<string> {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_PLATFORM_APP_URL + '/api/v1/templates/template',
      {
        template: props.templateName,
      }
    );

    return data?.template;
  } catch (error: any) {
    console.error('🚨 error', error?.message);
    return '';
  }
}
