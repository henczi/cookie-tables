import { CookieTables } from "$lib/cookie-tables/cookie-tables";

chrome.contextMenus.create({
  "id": "sampleContextMenu",
  "title": "Sample Context Menu",
  "contexts": ["selection"]
});

chrome.cookies.getAllCookieStores(console.log.bind(console, 'cookie stores'))
chrome.cookies.getAll({}, console.log.bind(console, 'cookies'))
chrome.cookies.onChanged.addListener(console.log.bind(console, 'Cookie change'))

const ct = new CookieTables();
ct.___test();
chrome.cookies.onChanged.addListener(ci => ct.onCookieChange(ci))