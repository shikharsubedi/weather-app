import axios, { AxiosResponse } from 'axios';
import { tempType } from './schema/types';
import { utcToZonedTime, formatInTimeZone } from 'date-fns-tz';

import { IWeatherData } from './schema/IWeatherData';
import { IResponseGenerator } from './schema/IResponseGenerator';

export default class WeatherService {
  private lat: number;
  private lon: number;
  private responseGenerator: IResponseGenerator;

  public constructor(
    lat: number,
    lon: number,
    responseGenerator: IResponseGenerator
  ) {
    this.lat = lat;
    this.lon = lon;
    this.responseGenerator = responseGenerator;
  }

  private static excludedParts = 'minutely,hourly,daily';

  private static readonly moderateTemp: number = 78;

  private static readonly lowTemp: number = 60;

  public async fetchWeather() {
    const data: IWeatherData = await this.weatherApi();
    return this.responseGenerator.generate(data);
  }

  private async weatherApi(): Promise<IWeatherData> | never {
    const apiData: AxiosResponse<IWeatherData, unknown> = await axios.request({
      method: 'get',
      url: process.env.WEATHER_URL,
      params: {
        lat: this.lat,
        lon: this.lon,
        units: process.env.units,
        exclude: WeatherService.excludedParts,
        appid: process.env.API_KEY,
      },
    });

    return apiData.data;
  }

  /**
   *
   * this method is used by Response Generator to generate the temperature description
   * @param temp number
   * @returns "hot" | "moderate" | "cold"
   */
  public static getTempDescription(temp: number): tempType {
    if (temp < WeatherService.lowTemp) {
      return 'cold';
    }
    if (temp >= WeatherService.lowTemp && temp <= WeatherService.moderateTemp) {
      return 'moderate';
    }
    return 'hot';
  }

  /**
   *
   * this method returns the weather summary. Used by the response generatory method
   * @param weather Array<{ description: string}>
   * @returns string
   */
  public static getWeatherDescription(
    weather: { description: string }[]
  ): string {
    return weather.map((cond) => cond.description).join(' and ');
  }

  /**
   * this method generate the date time string based on Unix timestamp in seconds
   * used by the ResponseGenerator to convert unix timestamp to date string
   */
  public static getDateLocaleString(
    timestamp: number,
    timezone: string
  ): string {
    const date = utcToZonedTime(timestamp * 1000, timezone);

    return formatInTimeZone(date, timezone, 'yyyy-MM-dd HH:mm:ss zzz'); // 2014-10-25 06:46:20 EST
  }
}
