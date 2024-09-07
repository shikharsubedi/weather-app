export class WeatherService {
  private lat: number;
  private long: number;
  public CurrentWeather(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }

  public async fetchWeather() {}
}
