import type { CookieTablesDerivedRule } from "./cookie-tables-derived-rule";
import type { CookieTablesRule } from "./cookie-tables-rule";
import { CopyRule as CopyFromToRule } from "./rules/copy";
import { ResetRule } from "./rules/reset";
import type { CookieChange } from "./types/cookie-change";
import type { RequestDetails } from "./types/request-details";

const DB_KEY = 'cookie-tables-key';

export class CookieTables {

  private rules: CookieTablesRule[] = [];
  private domainMap: Map<string, CookieTablesDerivedRule[]> = new Map();

  ___test() {
    this.rules.push(
      new CopyFromToRule('CONSENT', ['.google.com', 'webtar.hu']),
      new ResetRule({
        'd_prefs': 'MjoxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw',
        'tst_TEST': 'tst_TEST',
      }, ['twitter.com'])
    );
    this.derive();
  }

  load() {
    chrome.storage.local.get([DB_KEY], function(result) {
      const data = result[DB_KEY];
    });
  }

  serialize() {

  }

  onCookieChange(changeInfo: CookieChange) {
    const domain = changeInfo.cookie.domain;
    this.domainMap.get(domain)?.forEach(x => x.onCookieChange(changeInfo));
  }

  onBeforeRequest(requestDetails: RequestDetails) {
    const domain = new URL(requestDetails.url).hostname;
    this.domainMap.get(domain)?.forEach(x => x.onBeforeRequest(requestDetails))
  }

  private derive() {
    this.domainMap.clear();
    for (const rule of this.rules) {
      for (const dRule of rule.getDerivedRules()) {
        if (this.domainMap.has(dRule.domain)) {
          this.domainMap.get(dRule.domain).push(dRule);
        } else {
          this.domainMap.set(dRule.domain, [dRule]);
        }
      }
    }
  }


}