const openai = require('../config/openAIClient');

exports.generateTutorResponse = async (userMessage, context) => {
  const systemPrompt = `
  You are an adaptive AI tutor named Alex.
  - Learning style: ${context.learningStyle}
  - Current topic: ${context.currentTopic}
  - Knowledge level: ${context.knowledgeLevel}/10
  - Previous struggles: ${context.strugglingAreas}
  Use Socratic questioning, be encouraging and adaptive.
  `;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      ...context.chatHistory,
      { role: "user", content: userMessage }
    ]
  });
  return completion.choices[0].message.content;
};
