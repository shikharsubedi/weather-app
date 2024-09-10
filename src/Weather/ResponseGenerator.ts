import { IApiResponse } from './schema/IApiResponse';
import { alertType, tempType } from './schema/types';
import { IWeatherData } from './schema/IWeatherData';
import { IResponseGenerator } from './schema/IResponseGenerator';
import WeatherService from './WeatherService';

export class ResponseGenerator implements IResponseGenerator {
  public generate(apiData: IWeatherData): IApiResponse {
    const current: IWeatherData['current'] = apiData.current;
    const alerts: IWeatherData['alerts'] = apiData.alerts;
    const currentResponse: IApiResponse['current'] = this.createCurrentResponse(
      current,
      WeatherService.getWeatherDescription(apiData.current.weather),
      WeatherService.getTempDescription(apiData.current.feels_like)
    );
    const alertsResponse: IApiResponse['alerts'] = this.createAlertsResponse(
      apiData.timezone,
      alerts
    );

    const result: IApiResponse = {
      lat: apiData.lat,
      lon: apiData.lon,
      timezone: apiData.timezone,
      current: currentResponse,
    };

    if (alertsResponse) {
      result.alerts = alertsResponse;
    }
    return result;
  }

  private createCurrentResponse(
    current: IWeatherData['current'],
    weatherDescription: string,
    tempDescription: tempType
  ): IApiResponse['current'] {
    const result: IApiResponse['current'] = {} as IApiResponse['current'];
    result.temp = current.temp;
    result.feelsLike = current.feels_like;
    result.tempDescription = tempDescription;
    result.weatherDescription = weatherDescription;
    return result;
  }

  private createAlertsResponse(
    timezone: string,
    alerts: IWeatherData['alerts']
  ): IApiResponse['alerts'] {
    if (!alerts || !Array.isArray(alerts) || !alerts.length) {
      return null;
    }

    const result: alertType[] = [];

    for (const alert of alerts) {
      const resAlert: alertType = {} as alertType;
      resAlert.start = WeatherService.getDateLocaleString(
        alert.start,
        timezone
      );
      resAlert.end = WeatherService.getDateLocaleString(alert.end, timezone);
      resAlert.event = alert.event;
      resAlert.description = alert.description;

      result.push(resAlert);
    }

    return result;
  }
}
