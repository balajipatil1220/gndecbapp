const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveReminders() {
  const reminderDatas = [
    {
      title: 'Important Meeting 1',
      description:
        'Discuss project progress and review the latest marketing strategy with the team. Make sure to finalize the budget and allocation of resources.',
      duedate: '2023-10-10T14:00:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Deadline for Report Submission',
      description:
        'Submit the quarterly financial report to the board of directors. Include detailed analysis and recommendations for cost reduction and revenue increase.',
      duedate: '2023-10-20T23:59:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Investment Portfolio Review',
      description:
        'Review the performance of your investment portfolio. Consider rebalancing assets to align with your financial goals and risk tolerance.',
      duedate: '2023-10-15T09:30:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Credit Card Payment',
      description:
        'Make the minimum payment on your credit card by the due date to avoid late fees and interest charges.',
      duedate: '2023-10-25T18:00:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Financial Planning Consultation',
      description:
        'Schedule a consultation with a financial planner to discuss retirement planning and investment strategies.',
      duedate: '2023-10-12T16:45:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Monthly Expense Report',
      description:
        'Compile and submit the monthly expense report to the finance department. Ensure all receipts and expenses are accurately documented.',
      duedate: '2023-11-05T12:00:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Retirement Savings Check',
      description:
        'Contribute to your retirement savings account. Aim to meet your annual savings target to secure your financial future.',
      duedate: '2023-11-30T17:00:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Invoice Payment',
      description:
        'Review and pay outstanding invoices to vendors and suppliers. Ensure timely payments to maintain good business relationships.',
      duedate: '2023-11-10T14:30:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Stock Market Analysis',
      description:
        'Analyze the current state of the stock market and monitor your investment portfolio for potential adjustments.',
      duedate: '2023-11-15T10:00:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
    {
      title: 'Tax Planning Meeting',
      description:
        'Schedule a meeting with a tax advisor to plan for the upcoming tax season and explore tax-saving strategies.',
      duedate: '2023-11-18T16:00:00Z',
      status: 'PENDING',
      tags: [
        {
          userId: '6511d00dcd41b7195ab5a000',
        },
      ],
    },
  ];

  try {
    for (const reminderData of reminderDatas) {
      // Create a new reminder in the database
      await prisma.remainder.create({
        data: {
          title: reminderData.title,
          description: reminderData.description,
          duedate: new Date(reminderData.duedate),
          status: reminderData.status,
          userId: '6511d00dcd41b7195ab5a000',
          tags: {
            create: reminderData.tags.map((tag) => ({
              userId: tag.userId,
            })),
          },
        },
      });
    }

    console.log('Reminders saved to the database.');
  } catch (error) {
    console.error('Error saving reminders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to save reminders
saveReminders();
