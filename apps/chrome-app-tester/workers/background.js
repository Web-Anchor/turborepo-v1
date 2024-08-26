// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

const welcomePage = 'sidepanels/welcome-sp.html';
const mainPage = 'sidepanels/main-sp.html';
const GOOGLE_ORIGIN = 'https://www.google.com';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.sidePanel.setOptions({ path: welcomePage });
//   chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
// });

chrome.tabs.onActivated.addListener(async (props) => {
  /**
   * @description Tab activated event listener
   * @date 2024-08-26
   * @author Ed Ancerys
   */
  const panel = await chrome.sidePanel.getOptions({ tabId: props.tabId });
  console.log('Current path:', props, panel);

  // if (path === welcomePage) {
  //   chrome.sidePanel.setOptions({ path: mainPage });
  // }
});

// Initialize the demo on install
chrome.runtime.onInstalled.addListener((props) => {
  console.log('onInstalled', props);

  chrome.action.onClicked.addListener(openDemoTab);
});

function openDemoTab() {
  /**
   * @description Open app on side panel
   * @date 2024-08-26
   * @author Ed Ancerys
   */
  chrome.sidePanel
    .setPanelBehavior({
      openPanelOnActionClick: true,
    })
    .catch((error) => console.error(error));
}
