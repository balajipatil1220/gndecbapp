import { create } from 'domain';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import {
  MaintenanceStatus,
  MaintenanceType,
  ModuleName,
  remainderStatus,
} from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { hasPrivileges, PermissionType } from '@/lib/server-utils';
import { getCurrentUser } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    const json = await request.json();
    const body = Maintenance.parse(json);

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

    const CreatedMaintenance = await db.maintenance.create({
      data: {
        name: body.title,
        description: body.description,
        MaintenanceType: body.MaintenanceType,
        categoryID: body.categoryID,
        status: 'PENDING',
        requestedByuserId: user.id,
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'maintenance Created Susscesfully',
        data: { MaintenanceId: CreatedMaintenance.id },
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

const Maintenance = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(300).optional(),
  MaintenanceType: z.nativeEnum(MaintenanceType),
  categoryID: z.string(),
});
