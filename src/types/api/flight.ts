import {
  TFlightStatus,
} from '@/types/flight-status';
import {
  TGateType,
} from '@/types/gate-type';

const flightListProps = [
  'airline_cd',
  'best_arr_datetime_loc',
  'best_dep_datetime_loc',
  'cancel_status',
  'codeshare_fltnums',
  'dep_gate',
  'dep_terminal',
  'departure_delay',
  'dest_iata_cd',
  'dest_name',
  'dest_name_de',
  'flight_key',
  'flight_number',
  'sched_dep_datetime_loc',
];

const flightDetailsProps = [
  'airline_cd',
  'arr_gate',
  'arr_terminal',
  'best_arr_datetime_loc',
  'best_dep_datetime_loc',
  'cancel_status',
  'codeshare_fltnums',
  'dep_gate',
  'dep_terminal',
  'departure_delay',
  'dest_iata_cd',
  'dest_name',
  'dest_name_de',
  'flight_duration',
  'flight_key',
  'flight_number',
  'gate_closure_datetime_loc',
  'orig_dep_gate',
  'orig_iata_cd',
  'orig_name',
  'orig_name_de',
  'sched_arr_datetime_loc',
  'sched_boarding_datetime_loc',
  'sched_dep_datetime_loc',
  'walking_time_to_gate',
];

export const QUERY = {
  FLIGHT_LIST: flightListProps.join(' '),
  FLIGHT_DETAILS: flightDetailsProps.join(' '),
} as const;

type TObjectValues<T> = T[keyof T];

export type TQuery = TObjectValues<typeof QUERY>;

export enum EOperationName {
  GET_BY_DEPARTURE_GATE = 'getLegByDepGate',
  GET_UPCOMING = 'getUpcomingLegs'
}

export interface IFlightData {
  airborne_datetime_loc?: string;
  aircraft_type?: string;
  airline_cd: string;
  arrival_datetime_loc?: string;
  arr_gate?: string;
  arr_terminal?: string;
  best_arr_datetime_loc?: string;
  best_dep_datetime_loc?: string;
  best_dep_status: string;
  cancel_status?: string;
  codeshare_fltnums?: string;
  dep_gate?: string;
  dep_terminal?: string;
  departure_delay: string;
  departure_status: TFlightStatus;
  dest_iata_cd: string;
  dest_name: string;
  dest_name_de?: string;
  errors?: string;
  flight_duration?: string;
  flight_key: string;
  flight_number: string;
  gate_closure_datetime_loc?: string;
  offblock_datetime_loc?: string;
  orig_dep_gate?: string;
  orig_iata_cd: string;
  orig_name: string;
  orig_name_de?: string;
  sched_arr_datetime_loc: string;
  sched_boarding_datetime_loc?: string;
  sched_dep_datetime_loc: string;
  walking_time_to_gate?: string;
}

export interface IApiPayload {
  operationName: string,
  variables?: string,
  query: string
}

export interface IFlightPayload {
  operation: EOperationName,
  gate: {
    number: string,
    type: TGateType,
  },
  query: TQuery
}
