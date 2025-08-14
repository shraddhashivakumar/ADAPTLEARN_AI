const { generateTutorResponse } = require('../services/tutorService');

exports.chatWithTutor = async (req, res) => {
  const { message, context } = req.body;
  const reply = await generateTutorResponse(message, context);
  res.json({ reply });
};
