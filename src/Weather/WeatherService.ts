import axios, { AxiosResponse } from 'axios';
import { tempType } from './schema/types';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { IApiResponse } from './schema/IApiResponse';
import { IWeatherData } from './schema/IWeatherData';


export default class WeatherService {
  private lat: number;
  private lon: number;
  public constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }

  private static excludedParts = 'minutely,hourly,daily';

  private readonly moderateTemp:number = 78;

  private readonly lowTemp:number = 60;

  public async fetchWeather() {
    const data:IWeatherData = await this.weatherApi();
    return this.createResponse(data);
  }

  private async weatherApi():Promise<IWeatherData>|never {
    const apiData:AxiosResponse<IWeatherData, unknown> = await axios.request({
      method: 'get',
      url: process.env.WEATHER_URL,
      params: {
        lat:this.lat,
        lon:this.lon,
        units:process.env.units,
        exclude:WeatherService.excludedParts,
        appid:process.env.API_KEY
      }
    })

    return apiData.data;
  }

  private createResponse(apiData:IWeatherData):IApiResponse {
    const current:IWeatherData['current'] =apiData.current;
    const alerts:IWeatherData['alerts'] = apiData.alerts;
    const currentResponse:IApiResponse['current'] = this.createCurrentResponse(current);
    const alertsResponse:IApiResponse['alerts'] = this.createAlertsResponse(alerts,apiData.timezone);
    
    const result:IApiResponse = {
      lat:this.lat,
      lon:this.lon,
      timezone: apiData.timezone,
      current:currentResponse,
    };

    if(alertsResponse) {
      result.alerts = alertsResponse
    }
    return result;
  }

  private createCurrentResponse(current:IWeatherData['current']):IApiResponse['current'] {

    const result:IApiResponse['current'] = {} as IApiResponse['current'];
    result.temp = current.temp;
    result.feelsLike = current.feels_like;
    result.tempDescription = this.getTempDescription(current.feels_like);
    result.weatherDescription = this.getWeatherDescription(current.weather);

    return result;
  }

  private getTempDescription(temp:number):tempType {
    if(temp < this.lowTemp) {
      return 'cold';
    }
    if(temp >= this.lowTemp && temp <= this.moderateTemp) {
      return 'moderate'
    }
    return 'hot'
  }

  private getWeatherDescription(weather:IWeatherData['current']['weather']):string {
    return weather.map(cond => cond.description).join(' and ');
  }

  private createAlertsResponse(alerts:IWeatherData['alerts'], timezone:string):IApiResponse['alerts'] {
    if(!alerts || !Array.isArray(alerts) || !alerts.length) {
      return null;
    }

    type alertType = {
      start:string,
      end:string,
      description: string,
      event: string
   }

    const result:alertType[] = [];

    for(const alert of alerts) {
      const resAlert:alertType = {} as alertType;
      resAlert.start = this.getDateLocaleString(alert.start, timezone);
      resAlert.end = this.getDateLocaleString(alert.end, timezone);
      resAlert.event = alert.event;
      resAlert.description = alert.description;

      result.push(resAlert)
    }
  
    return result;
  }

  private getDateLocaleString(timestamp:number, timezone:string):string {
    const date = utcToZonedTime(timestamp, timezone)
    return format(date, 'yyyy-MM-dd HH:mm:ss zzz') // 2014-10-25 06:46:20 EST
  }
}
