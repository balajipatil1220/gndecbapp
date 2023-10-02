import { db } from '@/lib/db';

export async function getStaffsAnalytics() {
  try {
    const total = db.user.count();

    const SuperAdmins = db.user.count({
      where: {
        role: 'SUPERADMIN',
      },
    });

    const Admins = db.user.count({
      where: {
        role: 'ADMIN',
      },
    });

    const Staffs = db.user.count({
      where: {
        role: 'STAFF',
      },
    });

    const [t, s, a, u] = await db.$transaction([
      total,
      SuperAdmins,
      Admins,
      Staffs,
    ]);

    return {
      total: t,
      superAdmins: s,
      admins: a,
      staffs: s,
    };
  } catch (error: any) {
    throw new Error('some thing gone wrong', error.message);
  }
}

export async function getMaintenancesAnalytics() {
  try {
    const total = db.maintenance.count();

    const pending = db.maintenance.count({
      where: {
        status: 'PENDING',
      },
    });

    const inprogrss = db.maintenance.count({
      where: {
        status: 'INPROGRESS',
      },
    });

    const completed = db.maintenance.count({
      where: {
        status: 'REJECTED',
      },
    });

    const rejected = db.maintenance.count({
      where: {
        status: 'REJECTED',
      },
    });

    const [t, p, i, c, r] = await db.$transaction([
      total,
      pending,
      inprogrss,
      completed,
      rejected,
    ]);

    return {
      total: t,
      pending: p,
      inprogress: i,
      completed: c,
      rejected: r,
    };
  } catch (error: any) {
    throw new Error('some thing gone wrong', error.message);
  }
}

export async function getRemaindersAnalytics() {
  try {
    const total = db.remainder.count();

    const pending = db.remainder.count({
      where: {
        status: 'PENDING',
      },
    });

    const inprogress = db.remainder.count({
      where: {
        status: 'INPROGRESS',
      },
    });

    const completed = db.remainder.count({
      where: {
        status: 'COMPLETED',
      },
    });

    const expried = db.remainder.count({
      where: {
        status: 'EXPIRED',
      },
    });

    const [t, p, i, c, e] = await db.$transaction([
      total,
      pending,
      inprogress,
      completed,
      expried,
    ]);

    return {
      total: t,
      pending: p,
      inprogress: i,
      completed: c,
      expried: e,
    };
  } catch (error: any) {
    throw new Error('some thing gone wrong', error.message);
  }
}
