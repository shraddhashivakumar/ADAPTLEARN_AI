const openai = require('../config/openAIClient');

exports.generatePersonalizedLesson = async (topic, userProfile) => {
  const prompt = `
  Create a ${userProfile.difficulty} lesson on "${topic}" for a ${userProfile.learningStyle} learner.
  Student profile:
  - Knowledge level: ${userProfile.knowledgeLevel}/10
  - Learning style: ${userProfile.learningStyle}
  - Previous topics mastered: ${userProfile.masteredTopics}
  - Struggling areas: ${userProfile.strugglingAreas}

  Include:
  - Clear explanation with examples
  - Interactive elements for engagement
  - Practice problems
  - Visual aids if the student is a visual learner
  - Real-world applications

  Format as structured JSON with sections: "explanation", "interactive", "practice", "visuals", "applications".
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return JSON.parse(response.choices[0].message.content);
};
