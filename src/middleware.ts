import createMiddleware from 'next-intl/middleware';
import { LOCALE, locales, pathnames, localePrefix } from './lang/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: LOCALE.DE,
  pathnames,
  localePrefix
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};