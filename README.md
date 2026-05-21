# 🛡️ PrivacyLens

**PrivacyLens** is an AI-powered browser extension that automatically reads and summarizes Privacy Policies, Terms of Service, Terms and Conditions, and Disclaimers so you don't have to. Built with Google's Gemini AI (`gemini-2.5-flash`), it detects up to 3 critical privacy "red flags" and gives you a plain-English, 2-sentence TL;DR of the legal wall of text.

---

## ✨ Features

- **🚀 Auto-Detects Policy Pages**: Automatically triggers when you visit a page whose URL or title contains "privacy policy", "terms of service", "terms and conditions", or "disclaimer". Requires at least 200 characters of readable text on the page.
- **🚨 Red Flag Detection**: Uses Gemini AI to surface up to 3 of the most critical privacy risks (e.g., selling your data, location tracking, sharing with unnamed third parties) explained in simple, conversational language.
- **📝 TL;DR Summary**: Provides a 2-sentence summary written for everyday people, shown automatically in the floating panel and in the popup.
- **🔗 Smart Link Highlighting**: On every page you visit, links whose text contains "privacy policy", "terms of service", or "terms and conditions" are highlighted with a blue dashed bottom border and a light blue background tint so you always know where to click.
- **💎 Glassmorphic Floating UI**: A polished, animated floating panel (400 px wide, `backdrop-filter: blur`) slides up from the bottom-right corner of policy pages. The extension popup uses the same design language.

---

## 📁 File Structure

```
PrivacyLens/
├── manifest.json          # Manifest V3 extension config
├── config.js              # Your API key (git-ignored, create manually)
├── popup/
│   ├── popup.html         # Extension toolbar popup
│   ├── popup.css          # Popup styles (Outfit font, glassmorphic cards)
│   └── popup.js           # Manual analysis logic
└── scripts/
    ├── auto_analyze.js    # Content script: auto-detects policy pages,
    │                      #   injects floating panel, highlights links
    ├── auto_analyze.css   # Floating panel styles
    ├── background.js      # Service worker: calls Gemini API
    └── content.js         # Text extractor injected by the popup
```

---

## 🛠️ Installation & Setup

Since this is an unpacked extension, you'll need to load it manually into your browser.

### 1. Clone the Repository
```bash
git clone https://github.com/NANDANKUMAR14/PrivacyLens.git
cd PrivacyLens
```

### 2. Set Up Your API Key
This extension requires a Google Gemini API key to run the AI analysis.

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Create a file named `config.js` in the root of the `PrivacyLens` folder.
3. Paste the following into `config.js` with your key:
   ```javascript
   const CONFIG = {
     GEMINI_API_KEY: "YOUR_API_KEY_HERE"
   };
   ```
   > `config.js` is listed in `.gitignore`, so your API key will never be pushed to GitHub.

### 3. Load into Your Browser
**For Chrome / Edge / Brave:**
1. Open your browser and navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked**.
4. Select the `PrivacyLens` folder you cloned.

🎉 **You're done!** The extension is now active.

---

## 💡 How to Use

1. **Auto-Pilot**: Just browse the web. When you land on a page whose URL or title matches a policy keyword *and* the page has more than 200 characters of text, a floating "Privacy Lens Analysis" panel slides up automatically in the bottom-right corner. It first shows a loading spinner ("Scanning the fine print…"), then replaces it with the red flags and TL;DR summary.
2. **Manual Scan**: Click the **Privacy Lens** extension icon in your browser toolbar on *any* page, then click **"Analyze Current Page"** to trigger an on-demand analysis. The popup extracts up to 10,000 characters of text from the page and sends it to Gemini.
3. **Link Spotting**: On every page you visit, the extension automatically highlights links to privacy policies and terms pages with a dashed blue underline and a faint blue background, so they're impossible to miss.

---

## 💻 Tech Stack

| Layer | Details |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Design | Glassmorphism (`backdrop-filter: blur`), Google Outfit font, CSS animations |
| AI / Backend | Google Gemini API — `gemini-2.5-flash` |
| Architecture | Chrome Extensions API — Manifest V3 (service worker + content scripts) |
| Permissions | `activeTab`, `scripting` |

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/NANDANKUMAR14/PrivacyLens/issues).

---

*Built to fight consent fatigue and make the web a safer, more transparent place.*
