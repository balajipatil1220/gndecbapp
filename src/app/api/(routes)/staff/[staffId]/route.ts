import { NextResponse } from 'next/server';
import { ModuleName } from '@prisma/client';
import * as z from 'zod';

import { db } from '@/lib/db';
import { hasPrivileges, PermissionType } from '@/lib/server-utils';
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

    if (
      !(await hasPrivileges(IsUserExits, 'STAFFMODULE', PermissionType.Update))
    ) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const updatedStaff = await db.user.update({
      where: {
        id: params.staffId,
      },
      data: {
        name: body.name,
        email: body.email,
        phonenumber: body.phonenumber,
        gender: body.gender,
        role: body.role,
        address: body.address,
        Privilege: {
          update: {
            permissions: {
              updateMany: body.Privilege.permissions.map((permission) => ({
                where: { moduleName: permission.moduleName },
                data: {
                  Read: permission.Read,
                  Write: permission.Write,
                  Update: permission.Update,
                  Delete: permission.Delete,
                },
              })),
            },
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        msg: 'Staff Created Susscesfully',
        data: { staffId: updatedStaff.id },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log('[STAFF_POST]', error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}

const StaffBody = z.object({
  name: z.string().min(3, 'minimum 3 chars required'),
  email: z.string().min(3, 'minimum 3 chars required'),
  phonenumber: z.string().regex(/^\d{10,12}$/, 'phone number is invalid'),
  address: z
    .string()
    .min(3, 'minimum 3 char required')
    .max(100, 'max 100 chars are allowed')
    .optional(),
  role: z.enum(['ADMIN', 'SUPERADMIN', 'STAFF']),
  gender: z.enum(['MALE', 'FEMALE', 'OTHERS']),
  Privilege: z.object({
    permissions: z.array(
      z.object({
        moduleName: z.nativeEnum(ModuleName),
        Read: z.boolean(),
        Write: z.boolean(),
        Update: z.boolean(),
        Delete: z.boolean(),
      })
    ),
  }),
});

function generateStrongPassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialChars = '@$!%*?&';

  const allCharacters = lowercase + uppercase + digits + specialChars;

  const getRandomChar = (source: string) =>
    source[Math.floor(Math.random() * source.length)];

  let password = '';

  password += getRandomChar(lowercase);
  password += getRandomChar(uppercase);
  password += getRandomChar(digits);
  password += getRandomChar(specialChars);

  const remainingLength = 8 - password.length;

  for (let i = 0; i < remainingLength; i++) {
    password += getRandomChar(allCharacters);
  }

  console.log(password);

  return password;
}
