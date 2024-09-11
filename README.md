[![CircleCI](https://circleci.com/gh/shikhar-co/weather-app.svg?style=svg)](https://circleci.com/gh/shikhar-co/weather-app)

**Weather App**

Summary:
An app that takes in latitude and longitude values and returns the weather at the location.

Requirements:
This is a node.js typescript project that makes use of the Open Weather API at https://openweathermap.org/api/one-call-3
It uses express, mocha, chai sinon, eslint, prettier, nyc.

The entry point of the app is at src/main.ts

Node version required : 20

Usage:
Clone this repo. You need to provide a `.env` file at the root of the project with the following values:
1. `API_KEY= the api key for open weather`
2. `WEATHER_URL=https://api.openweathermap.org/data/3.0/onecall`
3. `PORT=3000`
4. `units=imperial`

In the command line terminal, you need to provide the following commands in sequence
1. run `npm i`
2. run `npm run watch` to run the project in watch mode
3. the api docs can be found at `http://localhost:3000/api/docs`

Tests:
run `npm run test` to run the tests

Linting:
run `npm run lint`

Code Coverage:
run `npm run test:coverage`

Style format:
run `npm run format`


Examples of the api call and response:


api Request
```bash
curl --location 'http://localhost:3000/api/v1/weather?lat=-89.32&lon=-78.32'
```

api Response:
```
{
    "lat": -89.32,
    "lon": -78.32,
    "timezone": "Antarctica/McMurdo",
    "current": {
        "temp": -62.82,
        "feelsLike": -75.42,
        "tempDescription": "cold",
        "weatherDescription": "overcast clouds"
    }
}
```

The `current` field in the response has the current weather. the `temp` field specifies the temperatue in `imperial` units i.e. `Fahrenheit`. The `tempDescription` field is based on the `feelsLike` field. and has the following rule
```
feelsLike<60 : cold
feelsLike>=60 and feelsLike<=78 : moderate
feelsLike>78 : hot
```
A more complete response is like this:
```json
{
  "lat": 80.2,
  "lon": -50.7,
  "timezone": "America/New_York",
  "current": {
    "temp": 75.8,
    "feelsLike": 80.8,
    "tempDescription": "hot",
    "weatherDescription": "rainy and sunny"
  },
  "alerts": [
    {
      "start": "2014-10-25 06:46:20 EST",
      "end": "2014-10-26 07:46:20 EST",
      "event": "Small Craft Advisory",
      "description": "Small Craft Advisory in effect from 5 pm"
    }
  ]
}
```

The `alerts` array is only present if there is an ongoing alert in the area. The `start` and `end` fields are based on the `timezone` field in the response.





