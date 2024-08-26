// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

// Initialize the demo on install
chrome.runtime.onInstalled.addListener((props) => {
  chrome.action.onClicked.addListener(openDemoTab);
});

function openDemoTab() {
  const GOOGLE_ORIGIN = 'https://www.google.com';

  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  // chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  //   console.log('Tab updated', tabId, info, tab);

  //   if (!tab.url) return;
  //   const url = new URL(tab.url);
  //   // Enables the side panel on google.com
  //   if (url.origin === GOOGLE_ORIGIN) {
  //     await chrome.sidePanel.setOptions({
  //       tabId,
  //       path: 'sidepanel.html',
  //       enabled: true,
  //     });
  //   } else {
  //     // Disables the side panel on all other sites
  //     await chrome.sidePanel.setOptions({
  //       tabId,
  //       enabled: false,
  //     });
  //   }
  // });
}
