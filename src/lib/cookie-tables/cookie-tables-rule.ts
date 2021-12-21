import type { CookieTablesDerivedRule } from "./cookie-tables-derived-rule";
import type { CookieTablesRuleType } from "./cookie-tables-rule-type";

export abstract class CookieTablesRule {
  type: CookieTablesRuleType;

  cookieName: string;
  domains: string[];

  constructor(_cookieName: string, _domains: string[]) {
    this.cookieName = _cookieName;
    this.domains = _domains
  }

  abstract getDerivedRules(): CookieTablesDerivedRule[]
}