import type { Cookie } from "./cookie";

export interface CookieChange {
  cause: "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite";
  cookie: Cookie;
  removed: boolean;
}