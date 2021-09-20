let newTab: boolean;
let tabId: number | undefined;

function createNewTab(url: string) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      chrome.tabs.create(
        {
          index: tabs[0].index + 1,
          url
        },
        (tab) => {
          tabId = tab.id;
          chrome.tabs.onRemoved.addListener((id) => {
            if (tabId === id) {
              tabId = undefined;
            }
          });
        }
      );
    }
  );
}

function onTransClick(info: chrome.contextMenus.OnClickData) {
  const urlComponentSufix = info.selectionText!.toLowerCase().replace('\s+', '_');
  const url = `https://wiktionary.org/wiki/${encodeURIComponent(
      urlComponentSufix
  )}`;
  if (!newTab && tabId !== undefined) {
    chrome.tabs.update(tabId, { active: true, url }, (tab) => {
      if (tab) {
        chrome.windows.update(tab.windowId, { focused: true });
      } else {
        createNewTab(url);
      }
    });
  } else {
    createNewTab(url);
  }
}

chrome.storage.sync.get(
  {
    newTab: 'false',
    languages: '[]'
  },
  (items) => {
    newTab = items.newTab === 'true';
    // Add context menu
    chrome.contextMenus.create({
      title: `Definition for "%s"`,
      contexts: ['selection'],
      onclick: (info) => {
        onTransClick(info);
      }
    });
  }
);
