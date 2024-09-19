export interface IWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    temp: number;
    feels_like: number;
    weather: {
      description: string;
    }[];
  };
  alerts?: {
    event: string;
    start: number;
    end: number;
    description: string;
  }[];
}
