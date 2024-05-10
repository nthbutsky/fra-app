export const FORMAT = {
  DATE: 'D. MMM',
  TIME: 'HH:mm',
  UNDEFINED: '-',
} as const;

type TObjectValues<T> = T[keyof T];

export type TFormat = TObjectValues<typeof FORMAT>;
