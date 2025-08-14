const { generatePersonalizedLesson } = require('../services/contentService');

exports.getLesson = async (req, res) => {
  const { topic, userProfile } = req.body;
  const lesson = await generatePersonalizedLesson(topic, userProfile);
  res.json(lesson);
};
