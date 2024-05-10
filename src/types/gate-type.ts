export const GATE_TYPE = {
  DEPARTURE_GATE: 'departure_gate',
  ARRIVAL_GATE: 'arrival_gate',
  CURRENT_GATE: 'current_gate',
} as const;

type TObjectValues<T> = T[keyof T];

export type TGateType = TObjectValues<typeof GATE_TYPE>;
