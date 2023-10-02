import { NextResponse } from 'next/server';
import { ModuleName } from '@prisma/client';
import bcrypt from 'bcryptjs';
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

    if (body.newpassword !== body.confirmpassword) {
      throw new Error('password not matching');
    }

    const passwordMatch = await bcrypt.compare(
      body.password,
      IsUserExits.password
    );

    // if password does not match
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    const salt = await bcrypt.genSalt(10);
    const newhashedPassword = await bcrypt.hash(body.newpassword, salt);

    const updatedStaff = await db.user.update({
      where: {
        id: params.staffId,
      },
      data: {
        password: newhashedPassword,
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'password updated Susscesfully',
        data: { staffId: updatedStaff.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[password_PATCH]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

const StaffBody = z.object({
  password: z
    .string()
    .min(4)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  newpassword: z
    .string()
    .min(4)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  confirmpassword: z
    .string()
    .min(4)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});
