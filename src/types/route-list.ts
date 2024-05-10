export const ROUTE_LIST = {
  GATE: '/gate',
  LIST: '/list',
  DETAIL: '/detail',
  PRIVACY: '/privacy',
  SECURITY: '/security',
  SERVICE_CENTER: '/service-center',
  SERVICE_CENTER_IRREG: '/service-center-irreg',
  MEAL_VOUCHER: '/meal-voucher',
  SEAT_UPGRADE: '/seat-upgrade',
  OPEN_HOUSE: '/open-house',
} as const;

type TObjectValues<T> = T[keyof T];

export type TRouteList = TObjectValues<typeof ROUTE_LIST>;
