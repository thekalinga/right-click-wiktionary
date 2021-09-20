const wikitionaryUrl = 'http://wikitionary.org/';
const developersUrl = 'https://github.com/thekalinga/right-click-wikitionary';

const wikitionaryMenu = document.getElementById('wikitionary') as HTMLAnchorElement;
const devMenu = document.getElementById('developers') as HTMLAnchorElement;
const issueMenu = document.getElementById('issues') as HTMLAnchorElement;

wikitionaryMenu.addEventListener('click', () =>
  chrome.tabs.create({ url: wikitionaryUrl })
);
devMenu.addEventListener('click', () =>
  chrome.tabs.create({ url: developersUrl })
);
issueMenu.addEventListener('click', () =>
  chrome.tabs.create({ url: `${developersUrl}/issues` })
);
