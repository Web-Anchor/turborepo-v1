'use server';

import { upload } from '@server/file-upload-bunnycdn';
import { auth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { templates, users } from '@db/schema';
import { v4 as uuidv4 } from 'uuid';
import {
  subscription,
  validateActiveSubMiddleware,
  validateAdvancedSubMiddleware,
} from '@server/subscription';
import { removeObj } from '@server/file-delete-bunnycdn';

export async function invoiceTemplate(formData: FormData): Promise<any> {
  try {
    const companyName = formData.get('companyName') as string;
    const imgUrl = formData.get('imgUrl') as File;
    const header = formData.get('header') as string;
    const memo = formData.get('memo') as string;
    const footer = formData.get('footer') as string;

    const isCompanyName = formData.get('isCompanyName') === 'on';
    const isImgUrl = formData.get('isImgUrl') === 'on';
    const isHeader = formData.get('isHeader') === 'on';
    const isMemo = formData.get('isMemo') === 'on';
    const isFooter = formData.get('isFooter') === 'on';
    const isCustomFields = formData.get('isCustomFields') === 'on';

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    console.log('👤 User: ', userId);
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });
    validateAdvancedSubMiddleware({ name: subRes?.product?.name });

    const data = Array.from(formData.entries()).map((entry) => {
      const [key, value] = entry;
      return { key, value };
    });
    const customFields: { a: 1 } | null = data
      .filter(({ key, value }) => key.includes('customFields') && value !== '')
      .reduce((acc, { key, value }) => {
        const index = key.split('-')[1];
        return { ...acc, [index]: { value } };
      }, {}) as { a: 1 } | null;

    // --------------------------------------------------------------------------------
    // 📌  Get user templates
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    const dbTemplates = await db
      .select()
      .from(templates)
      .where(eq(templates.userId, dbUser[0].id.toString()));

    console.log('📂 file:', imgUrl);
    console.log('📝 Form Data:', data);

    // --------------------------------------------------------------------------------
    // 📌  remove img from storage
    // --------------------------------------------------------------------------------
    if (!isImgUrl) {
      console.log('📂 Attempting Remove img from storage');
      await removeObj(dbTemplates?.[0]?.imgUrl!);
    }

    // --------------------------------------------------------------------------------
    // 📌  Add image to the storage
    // --------------------------------------------------------------------------------
    let url: string | undefined;
    if (isImgUrl) {
      console.log('📂 Attempting Upload img to storage');
      const { url: resUrl } = await upload(imgUrl);
      url = resUrl;
    }

    if (!!dbTemplates.length) {
      // --------------------------------------------------------------------------------
      // 📌  Update user template
      // --------------------------------------------------------------------------------
      await db
        .update(templates)
        .set({
          header: isHeader ? header : null,
          memo: isMemo ? memo : null,
          footer: isFooter ? footer : null,
          companyName: isCompanyName ? companyName : null,
          imgUrl: isImgUrl ? url || dbTemplates[0].imgUrl : null,
          customFields: isCustomFields ? customFields : null,
        })
        .where(eq(templates.userId, dbUser[0].id.toString()));
    }
    if (!dbTemplates.length) {
      // --------------------------------------------------------------------------------
      // 📌  Create new invoice template
      // --------------------------------------------------------------------------------
      await db.insert(templates).values({
        id: uuidv4(),
        userId: dbUser[0].id.toString(),
        header,
        memo,
        footer,
        companyName,
        imgUrl: url,
        customFields,
      });
    }

    console.log('📄 Template updated');
    return { status: 200, message: 'Template updated' };
  } catch (error) {
    console.log('Error uploading file:', error);
    return { status: 500, message: 'Error uploading file' };
  }
}
