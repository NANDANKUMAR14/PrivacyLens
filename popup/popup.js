document.getElementById('analyze-btn').addEventListener('click', async () => {
  const analyzeBtn = document.getElementById('analyze-btn');
  const loading = document.getElementById('loading');
  const results = document.getElementById('results');
  const errorDiv = document.getElementById('error');

  // UI state
  analyzeBtn.classList.add('hidden');
  loading.classList.remove('hidden');
  results.classList.add('hidden');
  errorDiv.classList.add('hidden');

  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Execute content script to extract text
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['scripts/content.js']
    });

    const pageText = injectionResults[0].result;

    if (!pageText || pageText.length < 100) {
      throw new Error("Could not find enough text on this page to analyze.");
    }

    // Send the extracted text to the background script for AI processing
    chrome.runtime.sendMessage(
      { action: "analyze_text", text: pageText },
      (response) => {
        loading.classList.add('hidden');

        if (chrome.runtime.lastError) {
          document.getElementById('error-text').textContent = "Error: " + chrome.runtime.lastError.message;
          errorDiv.classList.remove('hidden');
          analyzeBtn.classList.remove('hidden');
          return;
        }

        if (response.error) {
          document.getElementById('error-text').textContent = response.error;
          errorDiv.classList.remove('hidden');
          analyzeBtn.classList.remove('hidden');
        } else {
          // Populate results
          const redFlagsList = document.getElementById('red-flags-list');
          redFlagsList.innerHTML = '';
          response.data.redFlags.forEach(flag => {
            const li = document.createElement('li');
            li.textContent = flag;
            redFlagsList.appendChild(li);
          });

          document.getElementById('summary-text').textContent = response.data.summary;
          results.classList.remove('hidden');
        }
      }
    );

  } catch (err) {
    loading.classList.add('hidden');
    document.getElementById('error-text').textContent = err.message;
    errorDiv.classList.remove('hidden');
    analyzeBtn.classList.remove('hidden');
  }
});
