const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;

  // dynamic import of fetch for ESM compliance
  const { default: fetch } = await import('node-fetch');

  try {
    // Call OpenAI
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
You are a math assistant. Always respond in JSON exactly like this:
{"reply":"...","katex":"...","animation":{...}}
Only include "katex" if you have a formula, and "animation" if you have a drawing instruction.
            `.trim()
          },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const aiData = await aiResponse.json();

    // 1️⃣ If OpenAI itself returned an error (non-2xx), log & forward
    if (!aiResponse.ok) {
      console.error('OpenAI API error:', aiData);
      return res
        .status(aiResponse.status)
        .json({ reply: 'AI service error. Try again later.', katex: null, animation: null });
    }

    // 2️⃣ Guard: ensure we got at least one choice
    if (!aiData.choices || aiData.choices.length === 0) {
      console.error('No choices in AI response:', aiData);
      return res
        .status(500)
        .json({ reply: 'No response from AI.', katex: null, animation: null });
    }

    const aiMessage = aiData.choices[0].message.content;

    // 3️⃣ Try to parse the JSON payload from the AI
    let parsed;
    try {
      parsed = JSON.parse(aiMessage);
    } catch (parseErr) {
      console.error('Failed to parse AI JSON:', aiMessage, parseErr);
      return res
        .status(500)
        .json({ reply: "Sorry, I couldn't understand the AI response.", katex: null, animation: null });
    }

    // 4️⃣ Everything looks good—send it back
    return res.json(parsed);

  } catch (err) {
    // Catch any network or unexpected errors
    console.error('Server error:', err);
    return res
      .status(500)
      .json({ reply: 'Internal server error.', katex: null, animation: null });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));