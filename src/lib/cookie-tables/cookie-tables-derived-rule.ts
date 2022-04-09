import type { CookieChange } from "./types/cookie-change";
import type { RequestDetails } from "./types/request-details";

export interface ICookieTablesDerivedRule {
  domain: string;
  otherDomains: string[];

  onCookieChange(changeInfo: CookieChange): void;
  onBeforeRequest(requestDetails: RequestDetails): void; // TODO
}

export abstract class CookieTablesDerivedRule implements ICookieTablesDerivedRule {
  domain: string;
  otherDomains: string[];

  constructor(_domain: string, _otherDomains: string[]) {
    this.domain = _domain;
    this.otherDomains = _otherDomains
  }

  abstract onCookieChange(changeInfo: CookieChange): void;
  abstract onBeforeRequest(requestDetails: RequestDetails): void; // TODO
}