import {
  AxiosResponse,
} from 'axios';

export interface IApiResponse<T> extends Promise<AxiosResponse<T>> {}

export interface IApiResponseEmpty extends Promise<AxiosResponse<''>> {}
