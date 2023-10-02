import { create } from 'domain';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { MaintenanceStatus, MaintenanceType, ModuleName } from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { hasPrivileges, PermissionType } from '@/lib/server-utils';
import { getCurrentUser } from '@/lib/session';

export async function DELETE(
  request: Request,
  { params }: { params: { maintenanceId: string } }
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
      !(await hasPrivileges(IsUserExits, 'MAINTENANCE', PermissionType.Delete))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const deletedMaintenance = await db.maintenance.delete({
      where: {
        id: params.maintenanceId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'maintenance deleted Susscesfully',
        data: { maintenanceId: deletedMaintenance.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[Maintenance_PATCH]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { maintenanceId: string } }
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
      !(await hasPrivileges(IsUserExits, 'MAINTENANCE', PermissionType.Update))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const updatedMaintenance = await db.maintenance.update({
      where: {
        id: params.maintenanceId,
      },
      data: {
        name: body.title,
        description: body.description,
        categoryID: body.categoryID,
        MaintenanceType: body.MaintenanceType,
        status: body.status,
        MaintenanceAcceptedUser: {
          create: {
            userId: user.id,
            status: body.status,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'maintenance Updated Susscesfully',
        data: { maintenanceId: updatedMaintenance.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[Maintenance_PATCH]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

const reminderBody = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(300).optional(),
  MaintenanceType: z.nativeEnum(MaintenanceType),
  categoryID: z.string(),
  status: z.nativeEnum(MaintenanceStatus),
});
