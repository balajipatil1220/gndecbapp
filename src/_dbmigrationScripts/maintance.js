const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveReminders() {
  const maintenanceDatas = [
    {
      title: 'Repair Roof Leak',
      description:
        'Inspect and fix the roof leak in the main building to prevent water damage.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Plumbing Repairs',
      description:
        'Address plumbing issues in the school restrooms and classrooms, including fixing leaks and unclogging drains.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Security Camera Installation',
      description:
        'Install additional security cameras around the campus to enhance safety and surveillance.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Library Shelving Repairs',
      description:
        'Repair and reinforce library shelving to accommodate growing book collections.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Sanitation Supplies',
      description:
        'Ensure an adequate supply of sanitation products, including hand sanitizers and soap dispensers, throughout the school.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Dormitory Cleaning',
      description:
        'Clean and sanitize student dormitories regularly for a healthy living environment.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Playground Equipment Inspection',
      description:
        'Inspect and maintain playground equipment to ensure safety for students.',
      categoryId: '6517949b9743d740901c8e99',
    },
    {
      title: 'Electrical Panel Upgrade',
      description:
        'Upgrade the electrical panels in the administration building to meet safety standards and accommodate increased power demands.',
      categoryId: '651794a69743d740901c8e9a',
    },
    {
      title: 'Network Maintenance',
      description:
        "Perform maintenance on the school's computer network to ensure reliable connectivity and internet access.",
      categoryId: '651794a69743d740901c8e9a',
    },
    {
      title: 'Audio-Visual System Upgrade',
      description:
        'Upgrade classroom audio-visual systems for improved learning experiences.',
      categoryId: '651794a69743d740901c8e9a',
    },
    {
      title: 'Cafeteria Equipment Maintenance',
      description:
        'Maintain and service cafeteria equipment to ensure safe food preparation.',
      categoryId: '651794a69743d740901c8e9a',
    },
    {
      title: 'Science Lab Upgrades',
      description:
        'Upgrade equipment and facilities in the science labs to enhance STEM education.',
      categoryId: '651794a69743d740901c8e9a',
    },
    {
      title: 'Art Studio Repairs',
      description:
        "Address maintenance needs in the school's art studio, including lighting and ventilation.",
      categoryId: '651794a69743d740901c8e9a',
    },
  ];

  const MaintenanceStatus = {
    PENDING: 'PENDING',
    INPROGRESS: 'INPROGRESS',
    COMPLETED: 'COMPLETED',
    REJECTED: 'REJECTED',
  };

  const MaintenanceType = {
    NEW: 'NEW',
    RENOVATION: 'RENOVATION',
    DELETION: 'DELETION',
  };

  function getRandom(c) {
    const statuses = Object.values(c);
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }

  try {
    for (const maintenanceData of maintenanceDatas) {
      // Create a new reminder in the database
      await prisma.maintenance.create({
        data: {
          name: maintenanceData.title,
          description: maintenanceData.description,
          status: getRandom(MaintenanceStatus),
          MaintenanceType: getRandom(MaintenanceType),
          categoryID: maintenanceData.categoryId,
          MaintenanceRequestUser: {
            create: {
              userId: '6511d00dcd41b7195ab5a000',
            },
          },
        },
      });
      console.log('maintenance added');
    }

    console.log('maintenance saved to the database.');
  } catch (error) {
    console.error('Error saving reminders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to save reminders
saveReminders();
