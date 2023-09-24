const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const { z } = require('zod');

async function run() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@1234', salt);
    const user = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        phonenumber: '1234567890',
        password: hashedPassword,
        gender: 'MALE',
        role: 'SUPERADMIN',
      },
    });

    console.log(user.id + ' user created');
  } catch (error) {
    console.log(error);
  }
}

run()
  .then(() => console.log('completed'))
  .catch((err) => console.log(err));
