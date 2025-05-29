# Codex Dungeon – Emotionally Autonomous Story Engine

**Created by Melanie Bradshaw**  
A narrative AI engine that blends GPT-4 with a custom emotional state and fallout system for interactive fiction and storytelling.

---

### 🎯 Project Goal  
To explore emotionally reactive AI agents by simulating a "World Master" who responds to player choices using emotional variables like **trust**, **guilt**, and **obsession**. This engine showcases prompt design, API integration, and emotional state management using JSON.

---

### ⚙️ How It Works  
- **Frontend**: HTML/CSS UI with a loading screen and character card support  
- **Backend**: Node.js server using OpenAI GPT-4 via API  
- **Game Logic**:
  - Player inputs are sent with a story history to the AI
  - AI replies with a JSON object:
    ```json
    {
      "response": "Narrative text here...",
      "axis": { "trust": +1, "guilt": -1 },
      "tags": ["Silence", "Forgiveness"]
    }
    ```
  - This data drives fallout effects, echo threads, and player emotion tracking

---

### 🛠 Tech Stack
- Node.js  
- Express.js  
- OpenAI GPT-4 API  
- HTML/CSS frontend  

---

### 📷 Screenshot  
(Placeholder - Screenshot can be taken from the UI and AI output in the browser)

---

### 🔐 Environment
Create a `.env` file in the backend directory with:
```
OPENAI_API_KEY=your-api-key-here
```

---

### 🚀 Run It Locally
1. Clone repo  
2. Run `npm install` in the backend folder  
3. Start server with `node server.js`  
4. Open `loader.html` in the frontend folder using a browser

---

### 📚 Future Additions
- Persistent memory  
- Emotional graphing  
- Player-triggered rituals  
- Integration with CRMs or external tools
