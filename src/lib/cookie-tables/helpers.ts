export function domainToUrl(domain: string, secure: boolean, path?: string): string {
  return (secure ? 'https://' : 'http://')
    + (domain.charAt(0) === '.' ? 'www' : '')
    + domain
    + (path ?? '');
}