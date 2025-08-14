const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Calls OpenAI API with user message + optional context
 */
async function getAIResponse(message, context = {}) {
  const systemMessage = `You are AdaptLearn AI Tutor. 
  Context: ${JSON.stringify(context)}.
  Answer clearly and helpfully based on the student's level.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // You can swap model here
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content.trim();
}

module.exports = { getAIResponse };
