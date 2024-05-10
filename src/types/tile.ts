export const TILE = {
  AIRPORT_MAP: 'airport_map',
  AIRPORT_NAVIGATION: 'airport_navigation',
  BOARDING_PASS: 'boarding_pass',
  BOARDING_PROCESS: 'boarding_process',
  CHECK_GATE: 'check_gate',
  DELIGHTS: 'delights',
  DRINKING_FOUNTAIN: 'drinking_fountain',
  ENTIRE_MAP: 'entire_map',
  EXPERIENCE: 'experience',
  FURTHER_HELP: 'further_help',
  GAMES: 'games',
  GATE_FLIGHT_INFORMATION: 'gate_flight_information',
  HOTEL: 'hotel',
  LH_SERVICE_CENTER: 'lh_service_center',
  LOUNGE_ACCESS: 'lounge_access',
  LOUNGE_INFORMATION: 'lounge_information',
  MEAL_VOUCHER: 'meal_voucher',
  MORE_COMFORT: 'more_comfort',
  PLAYGROUND: 'playground',
  PROBLEMS_WITH_FLIGHT: 'problems_with_flight',
  REBOOKING: 'rebooking',
  RESTROOM: 'restroom',
  SECURITY_INFORMATION: 'security_information',
  SEAT_UPGRADE: 'seat_upgrade',
  SHARE_FEEDBACK: 'share_feedback',
  SHOP: 'shop',
  SMOKING_LOUNGE: 'smoking_lounge',
  TRAIN: 'train',
} as const;

type TObjectValues<T> = T[keyof T];

export type TTile = TObjectValues<typeof TILE>;

export interface ITile {
  name: TTile;
  icon?: string;
  text: string;
  link: string | (() => void);
}
