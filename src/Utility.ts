export enum tempType {
  kelvin,
  fahrenheit,
  celsius
}
export class Utility {
  public static convertFromKelvin(temp:number, to:tempType):number {
    if(to === tempType.kelvin) {
      return temp;
    }
    switch(to) {
      case tempType.fahrenheit:
        return this.convertToFahrenheit(temp)
      case tempType.celsius:
        return this.convertToCelsius(temp)
    }

  }
  private static convertToFahrenheit(temp:number):number {
    return  ((temp - 273.15) * 1.8) + 32;
  }

  private static convertToCelsius(temp:number): number {
   return (temp - 273.15);
  }
}