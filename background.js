// Listen for when the extension is clicked (using popup or action).
chrome.action.onClicked.addListener((tab) => {
    // Wait for the content script to be ready.
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: ensureContentScriptIsReady
    });
  });
  
  // Function to ensure content script is ready to receive messages
  function ensureContentScriptIsReady() {
    // Send a message to the content script to fill the fields
    chrome.runtime.sendMessage({ action: 'fill_form' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error in sending message to content script: ", chrome.runtime.lastError);
      } else {
        console.log("Message sent successfully to content script.");
      }
    });
  }
  
  // Function to read the clipboard data
  async function getClipboardData() {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  }
  