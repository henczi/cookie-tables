import type { CookieTablesDerivedRule } from "./cookie-tables-derived-rule";
import type { CookieTablesRule } from "./cookie-tables-rule";
import { CopyRule as CopyFromToRule } from "./rules/copy";
import type { CookieChange } from "./types/cookie-change";

const DB_KEY = 'cookie-tables-key';

export class CookieTables {

  private rules: CookieTablesRule[] = [];
  private domainMap: Map<string, CookieTablesDerivedRule[]> = new Map();

  ___test() {
    this.rules.push(
      new CopyFromToRule('CONSENT', ['.google.com', 'webtar.hu'])
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