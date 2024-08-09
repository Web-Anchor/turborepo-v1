import { Template } from '@tsTypes/index';
import Handlebars from 'handlebars';

export function generateTemplate(props: {
  data: Template;
  template: string;
}): string {
  const template = Handlebars.compile(props.template);
  console.log('Generating Template from data... ', props.data);

  return template(props.data);
}
