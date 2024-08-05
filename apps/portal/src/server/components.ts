import 'server-only';

import { db } from '@db/index';
import { eq, and } from 'drizzle-orm';
import { components as schemaComponents } from '@db/schema';

export async function components(props: { id: string }) {
  try {
    if (!props.id) {
      throw new Error('Vendor User id as API key is required');
    }
    // --------------------------------------------------------------------------------
    // 📌  User custom component list
    // --------------------------------------------------------------------------------
    let userComponents = await db
      .select()
      .from(schemaComponents)
      .where(and(eq(schemaComponents.userId, props.id)));

    return { components: userComponents };
  } catch (error: any) {
    // console.error(error);

    return { error: error?.message };
  }
}
