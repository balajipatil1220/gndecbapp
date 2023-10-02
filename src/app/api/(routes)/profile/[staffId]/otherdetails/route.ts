import { NextResponse } from 'next/server';
import { Gender, ModuleName } from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

export async function PATCH(
  request: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const user = await getCurrentUser();

    const json = await request.json();
    const body = StaffBody.parse(json);

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

    if (IsUserExits.id !== user.id) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const updatedStaff = await db.user.update({
      where: {
        id: params.staffId,
      },
      data: {
        gender: body.gender,
        address: body.address || '',
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'Profile updated Susscesfully',
        data: { staffId: updatedStaff.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[Profile_POST]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

const StaffBody = z.object({
  gender: z.nativeEnum(Gender),
  address: z.string().max(300).optional(),
});
