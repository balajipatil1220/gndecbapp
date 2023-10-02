import { db } from '@/lib/db';

export const getAllMaintenanceData = async (
  take: number,
  skip: number,
  query?: string
) => {
  let Query = {};
  if (query) {
    Query = {
      OR: [
        {
          name: { contains: query, mode: 'insensitive' },
        },
      ],
    };
  }
  try {
    const maintenances = await db.maintenance.findMany({
      take,
      skip,
      where: {
        ...Query,
        NOT: {
          status: 'PENDING',
        },
      },
      include: {
        MaintenanceRequestUser: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        maintenanceCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return maintenances;
  } catch (error: any) {
    throw new Error(
      `[maintenances server PAGE] Error retrieving remainder data: ${error.message}`
    );
  }
};

export const getMaintenanceDataByUser = async (
  take: number,
  skip: number,
  userId: string,
  query?: string
) => {
  let Query = {};
  if (query) {
    Query = {
      OR: [
        {
          name: { contains: query, mode: 'insensitive' },
        },
      ],
    };
  }
  try {
    const maintenances = await db.maintenance.findMany({
      take,
      skip,
      where: {
        MaintenanceRequestUser: {
          userId,
        },
        ...Query,
        NOT: {
          status: 'PENDING',
        },
      },
      include: {
        MaintenanceRequestUser: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        maintenanceCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return maintenances;
  } catch (error: any) {
    throw new Error(
      `[maintenances server PAGE] Error retrieving remainder data: ${error.message}`
    );
  }
};

export const getAllMaintenanceRequestData = async () => {
  try {
    const maintenances = await db.maintenance.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        MaintenanceRequestUser: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return maintenances;
  } catch (error: any) {
    throw new Error(
      `[maintenances server PAGE] Error retrieving remainder data: ${error.message}`
    );
  }
};

export const getMaintenanceRequestDataByUser = async (userId: string) => {
  try {
    const maintenances = await db.maintenance.findMany({
      where: {
        status: 'PENDING',
        MaintenanceRequestUser: {
          userId,
        },
      },
      include: {
        MaintenanceRequestUser: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return maintenances;
  } catch (error: any) {
    throw new Error(
      `[maintenances server PAGE] Error retrieving remainder data: ${error.message}`
    );
  }
};
