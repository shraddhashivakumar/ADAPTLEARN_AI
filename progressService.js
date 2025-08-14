const prisma = require('../config/prismaClient');
const { checkAchievements } = require('./gamificationService');

exports.updateUserProgress = async (userId, lessonId, performance) => {
  const completionRate = performance.correctAnswers / performance.totalQuestions;
  const timeSpent = performance.timeSpent;

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: {
      completionRate: completionRate * 100,
      timeSpent,
      lastAccessed: new Date()
    },
    create: {
      userId,
      lessonId,
      completionRate: completionRate * 100,
      timeSpent
    }
  });

  // Update knowledge level in user profile (simple example)
  const newKnowledgeLevel = Math.min(10, Math.round(completionRate * 10));
  await prisma.user.update({
    where: { id: userId },
    data: { knowledgeLevel: newKnowledgeLevel }
  });

  // Check for achievements
  await checkAchievements(userId, { type: 'lesson', completionRate });

  return progress;
};

exports.generateProgressInsights = async (userId) => {
  const progressData = await prisma.userProgress.findMany({ where: { userId } });

  const totalLessons = progressData.length;
  const avgCompletion = totalLessons
    ? progressData.reduce((acc, p) => acc + p.completionRate, 0) / totalLessons
    : 0;

  return {
    totalLessons,
    avgCompletion,
    prediction: avgCompletion > 80
      ? 'On track to mastery soon'
      : 'Needs consistent practice'
  };
};
