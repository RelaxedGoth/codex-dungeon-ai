const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store memory and companion thread states in-memory
let codexMemory = {};
let companionThreads = {
  "Melodia": {
    trust: 0,
    guilt: 0,
    obsession: 0,
    comfort: 0
  }
};

function generateOracle() {
  const rolls = ["Yes", "No", "Yes, but...", "No, and...", "An Echo", "An Omen", "A Betrayal", "A Revelation"];
  return rolls[Math.floor(Math.random() * rolls.length)];
}

app.post('/generate', async (req, res) => {
  const { userInput, storyHistory } = req.body;

  const oracleRoll = Math.random() < 0.25 ? generateOracle() : null;

  const memoryText = Object.entries(codexMemory).map(([key, val]) => `- ${key}: ${val}`).join('\n') || "None yet.";
  const companionText = Object.entries(companionThreads)
    .map(([name, axes]) => {
      return `${name}: ${Object.entries(axes).map(([k, v]) => `${k}=${v}`).join(", ")}`;
    }).join('\n');

  const systemPrompt = `
You are the World Master of THE CODEX: an emotionally autonomous storytelling engine.
Use Codex systems: Axis shifts, Glow, Echo Threads, Fallout, Rituals, Codex Memory, Companion Threads, Scene Oracle.

Current Memory:
${memoryText}

Companions:
${companionText}

Player input: "${userInput}"
Scene Oracle: ${oracleRoll || "None"}

Reply with only this format:
{
  "response": "Narrative response here.",
  "axis": { "trust": +1, "obsession": -1 },
  "tags": ["Betrayal", "Glow"],
  "fallout": "Describe the scene fallout here.",
  "glow": true,
  "glow_axis": "trust",
  "echo": "Describe echo thread if triggered.",
  "ritual": "Name of any ritual triggered.",
  "memory": { "KeyEvent": "Memory value" },
  "companion": {
    "Melodia": { "trust": +1, "guilt": -1 }
  },
  "oracle": "${oracleRoll || ""}"
}

Never explain. Never format. Respond only with valid JSON.
`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `${storyHistory}\nPlayer: ${userInput}` },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.9,
      max_tokens: 800,
    });

    const raw = completion.choices[0].message.content;
    console.log("RAW:", raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.warn('Could not parse JSON:', raw);
      return res.json({ response: raw, axis: {}, tags: [] });
    }

    // Update memory
    if (parsed.memory) {
      for (const [key, val] of Object.entries(parsed.memory)) {
        codexMemory[key] = val;
      }
    }

    // Update companion threads
    if (parsed.companion) {
      for (const [name, updates] of Object.entries(parsed.companion)) {
        if (!companionThreads[name]) {
          companionThreads[name] = {};
        }
        for (const [axis, change] of Object.entries(updates)) {
          companionThreads[name][axis] = (companionThreads[name][axis] || 0) + change;
        }
      }
    }

    parsed.memory = codexMemory;
    parsed.companion = companionThreads;
    parsed.oracle = oracleRoll;

    res.json(parsed);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
  }
});

app.get('/', (req, res) => {
  res.send('Codex Dungeon server is running. Try POSTing to /generate!');
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
