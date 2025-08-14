const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or gpt-4o, gpt-3.5-turbo, etc.
      messages: [
        { role: "system", content: "You are a helpful 1-on-1 technical tutor" },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI response failed" });
  }
});

module.exports = router;
