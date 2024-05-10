export const FLIGHT_STATUS = {
  AIRBORNE: 'Airborne',
  BEGIN_OF_BOARDING: 'Begin of boarding',
  END_OF_BOARDING: 'End of boarding',
  FIRST_CALL: 'First call',
  CANCELLED: 'Flight cancelled',
} as const;

type TObjectValues<T> = T[keyof T];

export type TFlightStatus = TObjectValues<typeof FLIGHT_STATUS>;
