// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

// Initialize the demo on install
chrome.runtime.onInstalled.addListener(({ reason }) => {
  console.log('onInstalled', reason);

  if (reason !== chrome.runtime.OnInstalledReason.INSTALL) {
    return;
  }

  openDemoTab();

  // Create an alarm so we have something to look at in the demo
  chrome.alarms.create('demo-default-alarm', {
    delayInMinutes: 1,
    periodInMinutes: 1,
  });
});

// Initialize the demo on install
chrome.runtime.onInstalled.addListener((props) => {
  console.log('Installed', props);

  chrome.action.onClicked.addListener(openDemoTab);
});

function openDemoTab() {
  // chrome.tabs.create({ url: 'index.html' });
  chrome.sidePanel.create({
    url: 'index.html',
    title: 'Demo Side Panel',
    iconPath: 'icon.png',
    open: true,
  });
  // open teh side menu
  // chrome.action.onClicked.addListener((tab) => {
  //   console.log('tab props', tab);

  //   chrome.sidePanel.setOptions({
  //     tabId: tab.id,
  //     path: 'index.html',
  //     open: true,
  //   });
  // });
}
