# 🛡️ PrivacyLens

**PrivacyLens** is an AI-powered browser extension that automatically reads and summarizes complex Privacy Policies and Terms of Service agreements so you don't have to. Built with Google's Gemini AI, it instantly detects critical privacy "red flags" and provides a 10-year-old friendly summary of how your data is being used.

---

## ✨ Features

- **🚀 Auto-Detects Privacy Pages**: Instantly triggers when you visit any Privacy Policy or Terms of Service page.
- **🚨 Red Flag Detection**: Uses Gemini AI to highlight the most critical privacy risks (e.g., selling your data, endless data retention, hidden location tracking) in plain English.
- **📝Summaries**: Gives you a 2-sentence conversational summary of the massive legal wall of text.
- **🔗 Smart Highlighting**: Finds and highlights links to Privacy Policies on *any* website you visit so you know where to click.
- **💎 Premium UI**: Beautiful, glassmorphic, fluid floating UI injected right into the webpage.

---

## 🛠️ Installation & Setup

Since this is an unpacked extension, you'll need to load it manually into your browser.

### 1. Clone the Repository
```bash
git clone https://github.com/NANDANKUMAR14/PrivacyLens.git
cd PrivacyLens
```

### 2. Set Up Your API Key
This extension requires a Google Gemini API Key to run the AI analysis.

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Copy the `config.example.js` file and rename it to `config.js`.
3. Open `config.js` and paste your API key:
   ```javascript
   const CONFIG = {
     GEMINI_API_KEY: "YOUR_API_KEY_HERE"
   };
   ```
*(Note: `config.js` is ignored by git, so your API key will remain safe and will not be pushed to GitHub).*

### 3. Load into your Browser
**For Chrome / Edge / Brave:**
1. Open your browser and navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
2. Enable **Developer mode** (usually a toggle in the top right or left).
3. Click the **Load unpacked** button.
4. Select the `PrivacyLens` folder you cloned.

🎉 **You're done!** The extension is now active.

---

## 💡 How to Use

1. **Auto-Pilot**: Just browse the web! When you visit a page with "Privacy Policy" or "Terms" in the title/URL, a beautiful floating window will automatically appear, scan the page, and show you the TL;DR.
2. **Manual Scan**: Click the `PrivacyLens` extension icon in your browser toolbar on *any* page and click **"Analyze Current Page"** to manually scan it for privacy risks.
3. **Link Spotting**: As you browse, the extension will automatically highlight links pointing to privacy policies with a soft blue dashed border so you never miss them.

---

## 💻 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Design**: Modern Glassmorphism, Google Outfit Font, Custom CSS Animations
- **Backend / AI**: Google Gemini API (`gemini-1.5-flash`)
- **Architecture**: Chrome Extensions API (Manifest V3)

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/NANDANKUMAR14/PrivacyLens/issues).

---

*Built to fight consent fatigue and make the web a safer, more transparent place.*
