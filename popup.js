// 读取CSV文件
document.getElementById('csvFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const rows = event.target.result.split('\n').map(row => row.split('\t'));
      chrome.storage.local.set({ data: rows });
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0]; // Get the first active tab in the array
        if (activeTab) {
          // Now execute the script on that active tab
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ['content.js']
          });
        }
      });
    };
    reader.readAsText(file);
  });
  
  // 读取剪贴板
  document.getElementById('pasteClipboard').addEventListener('click', async () => {
    const text = await navigator.clipboard.readText();
    const rows = text.split('\n').map(row => row.split('\t'));
    chrome.storage.local.set({ data: rows });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0]; // Get the first active tab in the array
        if (activeTab) {
          // Now execute the script on that active tab
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ['content.js']
          });
        }
      });
    // chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
  });
  