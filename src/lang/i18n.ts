import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {Pathnames} from 'next-intl/navigation';

export const LOCALE = {
  DE: 'de',
  EN: 'en',
} as const;
type TObjectValues<T> = T[keyof T];
export type TLocale = TObjectValues<typeof LOCALE>;

// Can be imported from a shared config
export const locales = Object.values(LOCALE);

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as TLocale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

export const pathnames = {
  '/': '/',
  '/list': {
    en: '/list',
    de: '/list'
  },
  '/detail': {
    en: '/detail',
    de: '/detail'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type TAppPathname = keyof typeof pathnames;