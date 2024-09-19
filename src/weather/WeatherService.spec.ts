/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import WeatherService from './WeatherService';
import { IWeatherData } from './schema/IWeatherData';
import { IResponseGenerator } from './schema/IResponseGenerator';

describe('WeatherService', function () {
  let responseGenerator: sinon.SinonStubbedInstance<IResponseGenerator>;
  let mockAxios: sinon.SinonStubbedInstance<typeof axios>;
  let service: WeatherService;

  before(function () {
    responseGenerator = { generate: sinon.stub() };
    mockAxios = sinon.stub(axios);
    service = new WeatherService(10, 20, responseGenerator);
  });

  describe('fetchWeather', function () {
    it('should call weatherApi and process the data', async function () {
      const mockData: IWeatherData = {
        lat: 80.2,
        lon: 120.0,
        timezone: 'America/New_York',
        current: {
          weather: [{ description: 'Sunny' }, { description: 'Rain' }],
          feels_like: 75,
          temp: 78,
        },
      };

      mockAxios.request.resolves({ data: mockData });

      await service.fetchWeather();

      expect(mockAxios.request.calledOnce).to.be.true;
      expect(responseGenerator.generate.calledOnce).to.be.true;

      const args = responseGenerator.generate.getCall(0).args;

      expect(args).to.eql([mockData]);
    });

    it('should handle errors from weatherApi', async function () {
      mockAxios.request.rejects(new Error('Network Error'));

      try {
        await service.fetchWeather();
      } catch (error: unknown) {
        expect((error as Error).message).to.equal('Network Error');
      }
    });
  });

  describe('processCurrent', function () {
    it('should return cloudy and moderate temp', function () {
      const currentData = {
        weather: [{ description: 'Cloudy' }],
        feels_like: 65,
        temp: 62,
      };

      const tempDescription = WeatherService.getTempDescription(
        currentData.feels_like
      );

      const weatherDescription = WeatherService.getWeatherDescription(
        currentData.weather
      );

      expect(weatherDescription).to.equal('Cloudy');
      expect(tempDescription).to.equal('moderate');
    });

    it('should return clear and hot temp', function () {
      const currentData = {
        weather: [{ description: 'clear' }],
        feels_like: 82,
        temp: 80,
      };

      const tempDescription = WeatherService.getTempDescription(
        currentData.feels_like
      );

      const weatherDescription = WeatherService.getWeatherDescription(
        currentData.weather
      );

      expect(weatherDescription).to.equal('clear');
      expect(tempDescription).to.equal('hot');
    });

    it('should return cloudy and rainy and cold temp', function () {
      const currentData = {
        weather: [{ description: 'cloudy' }, { description: 'rainy' }],
        feels_like: 55,
        temp: 56,
      };

      const tempDescription = WeatherService.getTempDescription(
        currentData.feels_like
      );

      const weatherDescription = WeatherService.getWeatherDescription(
        currentData.weather
      );

      expect(weatherDescription).to.equal('cloudy and rainy');
      expect(tempDescription).to.equal('cold');
    });
  });

  describe('convert date format', function () {
    it('should correct detect timezone and format date time number', function () {
      const timestampInSeconds = Math.round(1725987760039 / 1000);
      const string = WeatherService.getDateLocaleString(
        timestampInSeconds,
        'America/Los_Angeles'
      );
      expect(string).to.equal('2024-09-10 10:02:40 PDT');

      const newYorkTime = WeatherService.getDateLocaleString(
        timestampInSeconds,
        'America/New_York'
      );
      expect(newYorkTime).to.equal('2024-09-10 13:02:40 EDT');
    });
  });
});
