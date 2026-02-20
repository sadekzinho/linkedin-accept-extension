const activeTabs = new Set();

const DEFAULTS = {
  delayMin: 1200,
  delayMax: 2800,
  batchLimit: 50,
};

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url || !tab.url.includes("linkedin.com")) {
    return;
  }

  if (activeTabs.has(tab.id)) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        window.__linkedinAcceptorCancel = true;
      },
    });
    activeTabs.delete(tab.id);
    chrome.action.setBadgeText({ tabId: tab.id, text: "" });
    return;
  }

  activeTabs.add(tab.id);
  chrome.action.setBadgeText({ tabId: tab.id, text: "ON" });
  chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: "#0A66C2" });

  // Read settings and inject them before running content script
  const settings = await chrome.storage.sync.get(DEFAULTS);

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (s) => {
        window.__linkedinAcceptorSettings = s;
      },
      args: [settings],
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  } catch (err) {
    console.error("executeScript failed:", err);
  }

  activeTabs.delete(tab.id);
  chrome.action.setBadgeText({ tabId: tab.id, text: "" });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  activeTabs.delete(tabId);
});
