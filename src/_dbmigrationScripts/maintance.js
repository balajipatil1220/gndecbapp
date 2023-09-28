const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveReminders() {
  const maintenanceDatas = [
    {
      title: 'Repair Roof Leak',
      description:
        'Inspect and fix the roof leak in the main building to prevent water damage.',
    },
    {
      title: 'Lawn Mowing',
      description:
        'Mow and maintain the lawns across the school campus for a neat appearance.',
    },
    {
      title: 'Heating System Check',
      description:
        'Perform a routine check of the heating system to ensure it functions efficiently during the winter months.',
    },
    {
      title: 'Electrical Panel Upgrade',
      description:
        'Upgrade the electrical panels in the administration building to meet safety standards and accommodate increased power demands.',
    },
    {
      title: 'Plumbing Repairs',
      description:
        'Address plumbing issues in the school restrooms and classrooms, including fixing leaks and unclogging drains.',
    },
    {
      title: 'Security Camera Installation',
      description:
        'Install additional security cameras around the campus to enhance safety and surveillance.',
    },
    {
      title: 'Janitorial Services',
      description:
        'Provide daily janitorial services, including cleaning classrooms, hallways, and common areas.',
    },
    {
      title: 'Network Maintenance',
      description:
        "Perform maintenance on the school's computer network to ensure reliable connectivity and internet access.",
    },
    {
      title: 'Furniture Repair',
      description:
        'Repair and refurbish damaged classroom furniture to extend its lifespan.',
    },
    {
      title: 'Sports Field Maintenance',
      description:
        'Maintain the sports fields, including grass care and marking lines for various sports.',
    },
    {
      title: 'School Bus Inspection',
      description:
        'Conduct regular inspections and maintenance on school buses to ensure safe transportation for students.',
    },
    {
      title: 'Energy Audit',
      description:
        'Conduct an energy audit to identify opportunities for energy conservation and cost savings.',
    },
    {
      title: 'Recycling Program',
      description:
        'Implement a recycling program across the campus to reduce waste and promote sustainability.',
    },
    {
      title: 'Library Shelving Repairs',
      description:
        'Repair and reinforce library shelving to accommodate growing book collections.',
    },
    {
      title: 'Sanitation Supplies',
      description:
        'Ensure an adequate supply of sanitation products, including hand sanitizers and soap dispensers, throughout the school.',
    },
    {
      title: 'Audio-Visual System Upgrade',
      description:
        'Upgrade classroom audio-visual systems for improved learning experiences.',
    },
    {
      title: 'Cafeteria Equipment Maintenance',
      description:
        'Maintain and service cafeteria equipment to ensure safe food preparation.',
    },
    {
      title: 'Dormitory Cleaning',
      description:
        'Clean and sanitize student dormitories regularly for a healthy living environment.',
    },
    {
      title: 'Administrative Office Repairs',
      description:
        'Address maintenance issues in administrative offices, including lighting and HVAC systems.',
    },
    {
      title: 'Student Transportation Fleet',
      description:
        'Service and maintain the fleet of student transportation vehicles to ensure safety and reliability.',
    },
    {
      title: 'Emergency Drills',
      description:
        'Conduct regular emergency drills to prepare students and staff for various scenarios.',
    },
    {
      title: 'Athletic Field Renovation',
      description:
        'Plan and execute renovation projects for athletic fields and sports facilities.',
    },
    {
      title: 'Playground Equipment Inspection',
      description:
        'Inspect and maintain playground equipment to ensure safety for students.',
    },
    {
      title: 'Science Lab Upgrades',
      description:
        'Upgrade equipment and facilities in the science labs to enhance STEM education.',
    },
    {
      title: 'Art Studio Repairs',
      description:
        "Address maintenance needs in the school's art studio, including lighting and ventilation.",
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
          categoryID: '6515ad1c569cd8aed5bc47cf',
          requestedByuserId: '6511c8622943080decccf6d2',
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
