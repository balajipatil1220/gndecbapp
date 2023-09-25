import { ModuleName, User } from '@prisma/client';

import { db } from './db';

// Enum to define permission types
export enum PermissionType {
  Read = 'Read',
  Write = 'Write',
  Update = 'Update',
  Delete = 'Delete',
}

// Function to check user's privileges with dynamic module and permission type
export async function hasPrivileges(
  user: Pick<User, 'id'> | null,
  moduleName: ModuleName,
  permissionType: PermissionType
): Promise<boolean> {
  if (!user) return false;

  // Check if the user has the required privileges for the given module and permission type
  const privilege = await db.privilege.findFirst({
    where: {
      userId: user.id,
      permissions: {
        some: {
          moduleName: moduleName as ModuleName, // Convert moduleName to ModuleName enum
          [permissionType]: true,
        },
      },
    },
  });

  return privilege !== null;
}
