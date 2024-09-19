import { IApiResponse } from './IApiResponse';
import { IWeatherData } from './IWeatherData';

export interface IResponseGenerator {
  generate: (apiData: IWeatherData) => IApiResponse;
}
