const prisma = require('../config/prismaClient');
const { generateAssessmentQuestions, calculateKnowledgeLevel } = require('../services/assessmentService');

exports.createAssessment = async (req, res) => {
  const { subject, difficulty } = req.body;
  const questions = await generateAssessmentQuestions(subject, difficulty);
  res.json({ questions });
};

exports.submitAssessment = async (req, res) => {
  const { userId } = req.user;
  const { subject, questions, answers, timeSpent } = req.body;

  const score = calculateKnowledgeLevel({ correct: answers.correct, total: answers.total }, timeSpent);

  const assessment = await prisma.assessment.create({
    data: {
      userId,
      subject,
      score,
      questions,
      answers
    }
  });

  res.json({ assessment });
};
