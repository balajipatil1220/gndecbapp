import { create } from 'domain';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { ModuleName, remainderStatus } from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { hasPrivileges, PermissionType } from '@/lib/server-utils';
import { getCurrentUser } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    const json = await request.json();
    const body = reminderBody.parse(json);

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const IsUserExits = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!IsUserExits) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (
      !(await hasPrivileges(IsUserExits, 'STAFFMODULE', PermissionType.Write))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const createdRemainder = await db.remainder.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        duedate: new Date(body.duedate).toISOString(),
        userId: user.id,
        tags: {
          create: body.tags,
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'remainder Created Susscesfully',
        data: { RemainderId: createdRemainder.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[REMINDER_POST]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

const reminderBody = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(300).optional(),
  duedate: z.string(),
  status: z.nativeEnum(remainderStatus),
  tags: z.array(
    z.object({
      userId: z.string(),
    })
  ),
});
