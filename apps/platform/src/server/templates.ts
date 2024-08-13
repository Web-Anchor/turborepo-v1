'use server';

import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

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
    const templatePath = path.join(
      process.cwd(),
      '/src/templates',
      props.templateName
    );
    console.log('🔑 🚨 _templatePath', templatePath);

    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error: any) {
    console.error('🚨 error', error?.message);
    return '';
  }
}
