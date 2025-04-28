const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Listen for POST requests at /api/message
app.post('/api/message', (req, res) => {
  const { message } = req.body;

  console.log('Received message:', message);

  const lowerCaseMessage = message.toLowerCase();

  let reply = "I'm not sure how to respond to that yet.";
  let katex = null;
  let animation = null;

  // Basic scripted responses
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
    reply = "Hello! 👋 How can I help you with math today?";
  } else if (lowerCaseMessage.includes('addition')) {
    reply = "Addition means combining two or more numbers. Example:";
    katex = "2 + 3 = 5";
  } else if (lowerCaseMessage.includes('subtraction')) {
    reply = "Subtraction means taking one number away from another. Example:";
    katex = "5 - 2 = 3";
  } else if (lowerCaseMessage.includes('multiplication')) {
    reply = "Multiplication is repeated addition. Example:";
    katex = "4 \\times 3 = 12";
  } else if (lowerCaseMessage.includes('division')) {
    reply = "Division is splitting into equal parts. Example:";
    katex = "\\frac{12}{3} = 4";
  } else if (lowerCaseMessage.includes('integral')) {
    reply = "Here's a basic integral example:";
    katex = "\\int_0^1 x^2 \\, dx = \\frac{1}{3}";
    animation = {
      type: "integral",
      details: {
        bounds: [0, 1],
        function: "x^2"
      }
    };
  } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
    reply = "You're welcome! 😊 Let me know if you need more help.";
  }

  res.json({ reply, katex, animation });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
