import { create } from 'domain';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { ModuleName, remainderStatus } from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { hasPrivileges, PermissionType } from '@/lib/server-utils';
import { getCurrentUser } from '@/lib/session';

export async function GET(request: Request) {
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
      !(await hasPrivileges(IsUserExits, 'MAINTENANCE', PermissionType.Read))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const maintenanceCategory = await db.maintenanceCategory.findMany({});

    if (!maintenanceCategory) {
      return new NextResponse('maintenance Category not found', {
        status: 403,
      });
    }

    return new NextResponse(JSON.stringify(maintenanceCategory), {
      status: 200,
    });
  } catch (error: any) {
    console.log('[maintenanceCategory_GET]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    const json = await request.json();
    const body = maintenanceCategory.parse(json);

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
      !(await hasPrivileges(IsUserExits, 'MAINTENANCE', PermissionType.Write))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const CreatedmaintenanceCategory = await db.maintenanceCategory.create({
      data: {
        name: body.name,
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'maintenance Category Created Susscesfully',
        data: { maintenanceCategoryId: CreatedmaintenanceCategory.id },
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

const maintenanceCategory = z.object({
  name: z.string().min(2).max(50),
});
