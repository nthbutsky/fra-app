export const FORMAT = {
  DATE: {
    month: "short",
    day: "numeric",
  },
  TIME:   {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  },
  UNDEFINED: '-',
} as const;

type TObjectValues<T> = T[keyof T];

export type TFormat = TObjectValues<typeof FORMAT>;
