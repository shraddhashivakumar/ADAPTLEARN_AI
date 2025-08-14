const prisma = require('../config/prismaClient');

exports.checkAchievements = async (userId, activity) => {
  const achievementsData = [
    { type: 'streak', threshold: 7, title: 'Week Warrior', description: '7-day learning streak' },
    { type: 'completion', threshold: 10, title: 'Lesson Master', description: 'Completed 10 lessons' },
    { type: 'improvement', threshold: 20, title: 'Rising Star', description: 'Improved score by 20%' }
  ];

  for (let ach of achievementsData) {
    const alreadyHas = await prisma.achievement.findFirst({
      where: { userId, badgeType: ach.type }
    });
    if (alreadyHas) continue;

    // Example logic: mark achievement based on criteria
    if (activity.type === 'lesson' && ach.type === 'completion') {
      const count = await prisma.userProgress.count({
        where: { userId, completionRate: { gte: 100 } }
      });
      if (count >= ach.threshold) {
        await prisma.achievement.create({
          data: { userId, badgeType: ach.type, title: ach.title, description: ach.description }
        });
      }
    }
  }
};
