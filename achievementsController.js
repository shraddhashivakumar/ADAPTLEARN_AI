const prisma = require('../config/prismaClient');

exports.getAchievements = async (req, res) => {
  const { userId } = req.user;
  const achievements = await prisma.achievement.findMany({ where: { userId } });
  res.json(achievements);
};
