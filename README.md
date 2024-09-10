**Weather App**

Summary:
An app that takes in latitude and longitude values and returns the weather at the location.

Requirements:
This is a node.js typescript project that makes use of the Open Weather API at https://openweathermap.org/api/one-call-3
It uses express, mocha, chai sinon.

The entry point of the app is at src/main.ts

Node version required : 20

Usage:
Clone this repo. You need to provide a .env file at the root of the project with the following values:
API_KEY= the api key for open weather
WEATHER_URL=https://api.openweathermap.org/data/3.0/onecall
PORT=3000
units=imperial

In the command line terminal, you need to provide the following commands in sequence
1. run `npm i`
2. run `npm run watch` to run the project in watch mode
3. the api docs can be found at `http://localhost:3000/api/docs`


Tests:
run `npm run test` to run the tests

