import type { ICookieTablesDerivedRule } from "../cookie-tables-derived-rule";
import { CookieTablesRule } from "../cookie-tables-rule";
import { CookieTablesRuleType } from "../cookie-tables-rule-type";
import { domainToUrl } from "../helpers";
import type { CookieChange } from "../types/cookie-change";
import type { RequestDetails } from "../types/request-details";

export class ResetRule extends CookieTablesRule implements ICookieTablesDerivedRule {
  domain: string;
  otherDomains: string[];

  type = CookieTablesRuleType.COPY_FROM_TO;

  constructor(private initial: { [k: string]: string }, domains: string[]) {
    // TODO: validation
    if (domains.length !== 1)
      throw new Error('Invalid args');
    super('--TODO--', domains);

    this.domain = domains[0];
    this.otherDomains = [];
  }

  onCookieChange(changeInfo: CookieChange): void {
    console.log('ResetRule::onCookieChange', changeInfo)
  }

  onBeforeRequest(requestDetails: RequestDetails): void {
    console.log('ResetRule::onBeforeRequest', requestDetails)
    // if (requestDetails.initiator != undefined)
    //   return;

    ;(async () => {
      const url = new URL(requestDetails.url);
      const currentCookies = await chrome.cookies.getAll({ domain: this.domain })
      for (const c of currentCookies) {
        await chrome.cookies.remove({ name: c.name, url: url.origin})
      }
      for (const initKey in this.initial) {
        await chrome.cookies.set({
          domain: this.domain,
          expirationDate: 2147483647,
          httpOnly: false,
          name: initKey,
          path: url.pathname,
          secure: true,
          value: this.initial[initKey],
          url: url.origin
        });
      }
    })()
  }

  getDerivedRules() {
    return [this]
  }
}