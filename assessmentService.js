const openai = require('../config/openAIClient');

exports.generateAssessmentQuestions = async (subject, difficulty) => {
  const prompt = `Generate 10 ${difficulty} level questions for ${subject}. Format as JSON with: question, options[], correctAnswer, explanation`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });
  return JSON.parse(response.choices[0].message.content);
};

exports.calculateKnowledgeLevel = (answers, timeSpent) => {
  return Math.min(10, Math.round((answers.correct / answers.total) * 10));
};
