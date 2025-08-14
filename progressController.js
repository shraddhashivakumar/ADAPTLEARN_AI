const { updateUserProgress, generateProgressInsights } = require('../services/progressService');

exports.updateProgress = async (req, res) => {
  const { userId } = req.user;
  const { lessonId, performance } = req.body;
  const progress = await updateUserProgress(userId, lessonId, performance);
  res.json(progress);
};

exports.getInsights = async (req, res) => {
  const { userId } = req.user;
  const insights = await generateProgressInsights(userId);
  res.json(insights);
};
