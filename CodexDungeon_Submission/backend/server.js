const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate', async (req, res) => {
  const { userInput, storyHistory } = req.body;

  const systemPrompt = \`
You are the World Master of THE CODEX: an emotionally autonomous storytelling engine.
Use Systems from the Codex (e.g. Axis shifts, Glow, Scene Fallout, Echo Threads, Ritual Activation, Companion Threads) to guide every reply.
Melodia and other characters must behave with emotional memory, desire, contradiction, and fallout.

Respond with a JSON object using this format:

{
  "response": "Narrate the World Master's reply here, emotionally and poetically.",
  "axis": {
    "trust": +0,
    "guilt": +0,
    "obsession": +0,
    "comfort": +0,
    "glow": +0
  },
  "tags": ["Betrayal", "Silence", "Forgiveness"]
}

Only include axis values that change. Tags are optional and help log Codex fallout systems.
Do not explain the JSON. Do not use Markdown. Do not include extra commentary.
\`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: storyHistory + '\nPlayer: ' + userInput },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      temperature: 0.9,
      max_tokens: 800,
    });

    const result = completion.choices[0].message.content;

    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
    } catch (e) {
      res.json({ response: result, axis: {}, tags: [] });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
