export interface IApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dateTime: string;
    temp: number;
    feelsLike: number;
    tempDescription: 'hot' | 'moderate' | 'cold';
    weatherDescription: string;
  };
  alerts?: {
    start: string;
    end: string;
    description: string;
    event: string;
  }[];
}
