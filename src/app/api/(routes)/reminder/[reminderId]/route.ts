import { create } from 'domain';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { ModuleName, remainderStatus } from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { hasPrivileges, PermissionType } from '@/lib/server-utils';
import { getCurrentUser } from '@/lib/session';

export async function DELETE(
  request: Request,
  { params }: { params: { reminderId: string } }
) {
  try {
    const user = await getCurrentUser();

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
      !(await hasPrivileges(IsUserExits, 'REMAINDER', PermissionType.Delete))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const deletedRemainder = await db.remainder.delete({
      where: {
        id: params.reminderId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'remainder deleted Susscesfully',
        data: { RemainderId: deletedRemainder.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[REMINDER_DELETE]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { reminderId: string } }
) {
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
      !(await hasPrivileges(IsUserExits, 'REMAINDER', PermissionType.Update))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const updatedRemainder = await db.remainder.update({
      where: {
        id: params.reminderId,
      },
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
        msg: 'remainder Updated Susscesfully',
        data: { RemainderId: updatedRemainder.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[REMINDER_PATCH]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

const reminderBody = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(300).optional(),
  duedate: z.string(),
  status: z.nativeEnum(remainderStatus),
  tags: z.array(
    z.object({
      userId: z.string(),
    })
  ),
});
