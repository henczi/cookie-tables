import type { CookieChange } from "./types/cookie-change";

export abstract class CookieTablesDerivedRule {
  domain: string;
  otherDomains: string[];

  constructor(_domain: string, _otherDomains: string[]) {
    this.domain = _domain;
    this.otherDomains = _otherDomains
  }

  abstract onCookieChange(changeInfo: CookieChange): void;
  abstract onBeforeRequest(changeInfo: CookieChange): void; // TODO
}