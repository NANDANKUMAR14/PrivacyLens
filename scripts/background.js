// Load API Key from config.js (which is hidden from GitHub)
importScripts('../config.js');

const GEMINI_API_KEY = CONFIG.GEMINI_API_KEY;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze_text") {
    
    // // --- Mock Implementation ---
    // // Simulating a network delay for the AI response
    // setTimeout(() => {
    //   // Mocking the AI analyzing the text...
    //   const mockResult = {
    //     redFlags: [
    //       "They can share your data with unnamed 'third-party partners'.",
    //       "Your location data is tracked continuously.",
    //       "Opting out of data collection is a manual, difficult process."
    //     ],
    //     summary: "This privacy policy gives the company broad rights to use and share your data. While they state they don't sell data directly, they share it extensively for advertising purposes."
    //   };
      
    //   sendResponse({ data: mockResult });
    // }, 2000);
    
    // ----------------------------------------------------
    // --- REAL IMPLEMENTATION (Uncomment and set API key) ---
    // ----------------------------------------------------
    
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a privacy expert who explains legal jargon to everyday people. Analyze the following privacy policy text. 
            
Task 1: Identify up to 3 of the most critical "red flags" (e.g., selling data, tracking location, sharing with unnamed third parties). Explain each red flag in extremely simple, conversational language like you are warning a friend (max 1 sentence per flag).
Task 2: Provide a short, 2-sentence overall summary of the policy that a 10-year-old could understand. 

Format your entire response strictly as a JSON object with NO markdown formatting, using these exact keys: "redFlags" (array of strings) and "summary" (string). 

Privacy Policy Text:\n\n${request.text}`
          }]
        }]
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error("API Error:", data.error);
        sendResponse({ error: data.error.message });
        return;
      }
      
      // Parse the response from Gemini
      try {
        const rawText = data.candidates[0].content.parts[0].text;
        // Clean up markdown block if present
        const jsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const result = JSON.parse(jsonStr);
        sendResponse({ data: result });
      } catch(e) {
        console.error("Parsing Error:", e, "Raw data:", data);
        sendResponse({ error: "Failed to parse AI response." });
      }
    })
    .catch(error => {
      console.error("Network Error:", error);
      sendResponse({ error: error.message });
    });
    

    return true; // Indicates we will send a response asynchronously
  }
});
