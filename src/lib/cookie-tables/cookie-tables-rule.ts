import type { ICookieTablesDerivedRule } from "./cookie-tables-derived-rule";
import type { CookieTablesRuleType } from "./cookie-tables-rule-type";

export interface ICookieTablesRule {
  type: CookieTablesRuleType;

  cookieName: string; // TODO: remove ?!
  domains: string[];

  getDerivedRules(): ICookieTablesDerivedRule[]
}

export abstract class CookieTablesRule implements ICookieTablesRule {
  type: CookieTablesRuleType;

  cookieName: string;
  domains: string[];

  constructor(_cookieName: string, _domains: string[]) {
    this.cookieName = _cookieName;
    this.domains = _domains
  }

  abstract getDerivedRules(): ICookieTablesDerivedRule[]
}