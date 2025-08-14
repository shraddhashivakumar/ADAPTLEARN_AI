const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete existing data to avoid duplicates when re-seeding
  await prisma.achievement.deleteMany({});
  await prisma.chatSession.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.assessment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      learningStyle: 'visual',
      knowledgeLevel: 3,
      assessments: [],
      progress: [],
      chatSessions: [],
      achievements: [],
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      learningStyle: 'auditory',
      knowledgeLevel: 5,
      assessments: [],
      progress: [],
      chatSessions: [],
      achievements: [],
    },
  });

  // Create sample lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      subject: 'Mathematics',
      topic: 'Algebra Basics',
      difficulty: 4,
      content: {
        explanation: "This lesson covers the basics of algebra including variables, expressions, and equations.",
      },
      type: "text",
      prerequisites: [],
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      subject: 'Science',
      topic: 'Photosynthesis',
      difficulty: 5,
      content: {
        explanation: "This lesson covers the biological process by which plants make their food.",
      },
      type: "video",
      prerequisites: [],
    },
  });

  // Create progress for user1 for lesson1
  await prisma.userProgress.create({
    data: {
      userId: user1.id,
      lessonId: lesson1.id,
      completionRate: 50,
      timeSpent: 600,
      lastAccessed: new Date(),
    },
  });

  // Create an achievement for user1
  await prisma.achievement.create({
    data: {
      userId: user1.id,
      badgeType: 'streak',
      title: 'First Steps',
      description: 'Completed first 50% of a lesson',
      earnedAt: new Date(),
    },
  });

  console.log('Seeding completed! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
