'use server';

import { add } from '@repo/lib/add';

export async function serverAction(props: any) {
  console.log('🚀 PROPS:', props);

  return add(props.a, props.b);
}
