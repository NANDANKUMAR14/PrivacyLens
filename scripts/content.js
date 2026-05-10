// Function to extract readable text from the page
function extractPageText() {
  // A simple heuristic: grab paragraphs and headings
  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
  let text = '';
  
  elements.forEach(el => {
    // Basic filtering to avoid hidden text or nav bars
    if (el.innerText && el.offsetParent !== null) {
      text += el.innerText + '\n';
    }
  });

  // Limit the amount of text to avoid payload too large (e.g., grab first 10,000 characters)
  return text.substring(0, 10000);
}

// When injected, this will be the result
extractPageText();
