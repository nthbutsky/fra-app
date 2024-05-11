import {
  IApiPayload,
  IFlightData,
  IFlightPayload,
} from '@/types/api/flight';
import {
  apiHttpClient,
} from '@/api/api-http-client';
import {
  IApiResponse,
} from '@/types/api/api-response';

export const getFlightData = (payload: IFlightPayload): IApiResponse<IFlightData[]> => {
  const operation = payload.operation;
  const gateType = payload.gate.type;
  const gateNumber = payload.gate.number.toUpperCase();
  const query = payload.query;
  const apiKey = process.env.NEXT_PUBLIC__FLIGHT_API;

  const apiUrl = `https://flightapi.fraalliance.de/flightapi/graphql/api/${apiKey}`;
  const apiQuery = `query ${operation} { ${operation}(${gateType}: "${gateNumber}") { leg { ${query} } success errors } }`;

  return apiHttpClient.post(apiUrl, {
    operationName: operation,
    query: apiQuery,
  } as IApiPayload);
};
