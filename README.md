# Codex Dungeon: AI World Master

Codex Dungeon is an emotionally responsive storytelling engine powered by GPT-4, inspired by immersive narrative RPGs and custom emotional AI systems. It simulates a dynamic world master that reacts with memory, contradictions, rituals, and narrative consequences — not just responses.

## 🌟 Features

- 🎭 Emotionally reactive AI storytelling
- 🔥 Glow system for emotional escalation
- 🌀 Echo Threads to detect recurring themes
- 🧠 Codex Memory panel (AI world memory)
- 🧑‍🤝‍🧑 Companion Threads (NPCs with emotional axes)
- 🕯️ Ritual system with narrative triggers
- 📖 Fallout log for narrative consequences
- 💾 Save/Load/Reset session state in-browser
- 📜 Scene Oracle panel for AI-generated dramatic insights

## 🛠️ Technologies Used

- Node.js (Express) backend
- OpenAI API (GPT-4)
- Vanilla HTML/CSS/JavaScript frontend
- Replit or localhost compatible

## 🚀 How to Run

1. Clone the repository or upload to [Replit](https://replit.com/)
2. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_key_here
   ```
3. Run the backend server:
   ```bash
   node server.js
   ```
4. Open `index.html` in your browser or serve it with the backend.

## 📂 Project Structure

```
.
├── index.html          # Frontend UI
├── loader.html         # Entry quote animation
├── server.js           # Express backend + OpenAI integration
├── .env                # API key (not committed)
```

## 📣 Acknowledgments

Created by Melanie Bradshaw as part of a hands-on AI internship application project. Features and systems inspired by **THE CODEX**, a homebrew narrative ruleset.

This project blends creative storytelling, emotional AI, and full-stack development into a playable AI world.

## ⚠️ Disclaimer

Make sure your OpenAI account has access to the GPT-4 model and you are not exceeding your quota or usage limits.
