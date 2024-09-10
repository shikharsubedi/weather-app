import { expect } from 'chai';
import { describe, it } from 'mocha';
import { IWeatherData } from './schema/IWeatherData';
import { ResponseGenerator } from './ResponseGenerator'; // Replace with your actual file path
import { IApiResponse } from './schema/IApiResponse';

describe('ResponseGenerator', () => {
  let generator: ResponseGenerator;
  let mockApiData: IWeatherData;

  beforeEach(function () {
    generator = new ResponseGenerator();
    mockApiData = {
      lat: 40.7128,
      lon: -74.0059,
      timezone: 'America/New_York',
      current: {
        temp: 20,
        feels_like: 18,
        weather: [
          {
            description: 'Heavy Rain',
          },
        ],
      },
      alerts: [
        {
          event: 'Heavy Rain',
          description: 'Expect heavy rain starting tonight.',
          start: 1684952747,
          end: 1684988747,
        },
      ],
    };
  });

  it('should generate a basic response with current weather', async () => {
    const weatherDescription = 'Heavy Rain';
    const tempDescription = 'cold';
    const alertsResponse: IApiResponse['alerts'] = [
      {
        start: '2023-05-24 14:25:47 GMT-4',
        end: '2023-05-25 00:25:47 GMT-4',
        event: 'Heavy Rain',
        description: 'Expect heavy rain starting tonight.',
      },
    ];

    const response = generator.generate(mockApiData);

    expect(response).to.deep.equal({
      lat: mockApiData.lat,
      lon: mockApiData.lon,
      timezone: mockApiData.timezone,
      current: {
        temp: mockApiData.current.temp,
        feelsLike: mockApiData.current.feels_like,
        tempDescription,
        weatherDescription,
      },
      alerts: alertsResponse,
    });
  });

  it('should omit alerts if none are present', async () => {
    const data = JSON.parse(JSON.stringify(mockApiData)) as IWeatherData;
    delete data.alerts;
    const response = generator.generate(data);

    expect(response).to.not.have.property('alerts');
  });
});
