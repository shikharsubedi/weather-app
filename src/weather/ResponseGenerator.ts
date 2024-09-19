import { IApiResponse } from './schema/IApiResponse';
import { alertType } from './schema/types';
import { IWeatherData } from './schema/IWeatherData';
import { IResponseGenerator } from './schema/IResponseGenerator';
import WeatherService from './WeatherService';

export class ResponseGenerator implements IResponseGenerator {
  /**
   *
   * @param apiData IWeatherData
   * @returns IApiResponse
   * This method implements the IResponseGenerator interface
   */
  public generate(apiData: IWeatherData): IApiResponse {
    const current: IWeatherData['current'] = apiData.current;

    const alerts: IWeatherData['alerts'] = apiData.alerts;

    const currentResponse: IApiResponse['current'] =
      this.createCurrentResponse(current);

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
    current: IWeatherData['current']
  ): IApiResponse['current'] {
    const result: IApiResponse['current'] = {} as IApiResponse['current'];
    result.temp = current.temp;
    result.feelsLike = current.feels_like;
    result.tempDescription = WeatherService.getTempDescription(
      current.feels_like
    );
    result.weatherDescription = WeatherService.getWeatherDescription(
      current.weather
    );
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
