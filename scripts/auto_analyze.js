function isPrivacyPage() {
  const url = window.location.href.toLowerCase();
  const title = document.title.toLowerCase();
  
  // Check for common keywords in URL or Title
  const keywords = ['privacy', 'terms', 'conditions','disclaimer','privacy policy','terms of service','terms and conditions'];
  return keywords.some(keyword => url.includes(keyword) || title.includes(keyword));
}

function extractTextForAuto() {
  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
  let text = '';
  elements.forEach(el => {
    if (el.innerText && el.offsetParent !== null) {
      text += el.innerText + '\n';
    }
  });
  return text.substring(0, 10000);
}

function injectPopup(data, isLoading = false) {
  let container = document.getElementById('privacy-extension-auto-popup');
  
  // Create container if it doesn't exist
  if (!container) {
    container = document.createElement('div');
    container.id = 'privacy-extension-auto-popup';
    document.body.appendChild(container);
  }

  if (isLoading) {
    container.innerHTML = `
      <div class="privacy-header">
        <div class="header-title">
          <span class="logo-spin">🛡️</span>
          <h3>Privacy Lens</h3>
        </div>
        <button id="privacy-close-btn">&times;</button>
      </div>
      <div class="privacy-body loading-state">
        <div class="scanning-ring"></div>
        <p>Scanning the fine print...</p>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="privacy-header">
        <div class="header-title">
          <span>🛡️</span>
          <h3>Privacy Lens Analysis</h3>
        </div>
        <button id="privacy-close-btn">&times;</button>
      </div>
      <div class="privacy-body">
        <div class="privacy-red-flags fade-in">
          <div class="section-title">
            <span>🚨</span>
            <h4>Critical Red Flags</h4>
          </div>
          <ul>
            ${data.redFlags.map(flag => `<li>${flag}</li>`).join('')}
          </ul>
        </div>
        <div class="privacy-summary fade-in" style="animation-delay: 0.1s;">
          <div class="section-title">
            <span>✨</span>
            <h4>Summary</h4>
          </div>
          <p>${data.summary}</p>
        </div>
      </div>
    `;
  }

  // Re-attach event listener since innerHTML was replaced
  document.getElementById('privacy-close-btn').addEventListener('click', () => {
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px) scale(0.95)';
    setTimeout(() => container.remove(), 300);
  });
}

// Check if we are on a privacy policy page
if (isPrivacyPage()) {
  const text = extractTextForAuto();
  
  // Only analyze if there's enough text on the page
  if (text.length > 200) {
    // Show the loading state immediately!
    injectPopup(null, true);

    chrome.runtime.sendMessage({ action: "analyze_text", text: text }, (response) => {
      if (response && response.data) {
        injectPopup(response.data, false);
      } else if (response && response.error) {
        injectPopup({
          redFlags: ["Error occurred while analyzing."],
          summary: "API Error: " + response.error
        }, false);
      }
    });
  }
}

// Highlight privacy policy links on ANY page
function highlightPrivacyLinks() {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const linkText = link.innerText.toLowerCase();
    if (linkText.includes('privacy policy') || linkText.includes('terms of service') || linkText.includes('terms and conditions')) {
      link.style.borderBottom = '2px dashed #007bff';
      link.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
      link.title = 'Privacy Lens will automatically analyze this page when clicked!';
    }
  });
}

// Run highlight function
highlightPrivacyLinks();
