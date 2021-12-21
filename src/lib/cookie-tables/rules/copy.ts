import { CookieTablesDerivedRule } from "../cookie-tables-derived-rule";
import { CookieTablesRule } from "../cookie-tables-rule";
import { CookieTablesRuleType } from "../cookie-tables-rule-type";
import { domainToUrl } from "../helpers";
import type { CookieChange } from "../types/cookie-change";

class CopyRuleDerivedFrom extends CookieTablesDerivedRule {

  get toDomain() {
    return this.otherDomains[0]
  }

  onCookieChange(changeInfo: CookieChange): void {
    console.log('CopyRuleDerivedFrom::onCookieChange', changeInfo)

    const url = domainToUrl(this.toDomain, changeInfo.cookie.secure, changeInfo.cookie.path);

    if (changeInfo.removed) {
      chrome.cookies.remove({ name: changeInfo.cookie.name, url })
    } else {
      chrome.cookies.set({
        domain: this.toDomain,
        expirationDate: changeInfo.cookie.expirationDate,
        httpOnly: changeInfo.cookie.httpOnly,
        name: changeInfo.cookie.name,
        path: changeInfo.cookie.path,
        sameSite: changeInfo.cookie.sameSite,
        secure: changeInfo.cookie.secure,
        value: changeInfo.cookie.value,
        url
      });
    }
  }
  onBeforeRequest(changeInfo: CookieChange): void {

  }

}

class CopyRuleDerivedTo extends CookieTablesDerivedRule {
  onCookieChange(changeInfo: CookieChange): void {
    console.log('CopyRuleDerivedTo::onCookieChange', changeInfo)
  }
  onBeforeRequest(changeInfo: CookieChange): void {

  }

}

export class CopyRule extends CookieTablesRule {
  type = CookieTablesRuleType.COPY_FROM_TO;

  constructor(cookieName: string, domains: string[]) {
    // TODO: validation
    if (domains.length !== 2)
      throw new Error('Invalid args');
    super(cookieName, domains);
  }

  getDerivedRules() {
    return [
      new CopyRuleDerivedFrom(this.domains[0], [this.domains[1]]),
      new CopyRuleDerivedTo(this.domains[1], [this.domains[0]]),
    ]
  }
}