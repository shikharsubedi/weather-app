import { healthCheck } from "./healthCheck";
import { version } from "../package.json";
import { fetchCurrentWeather } from "./currentWeather";
export const apiDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Weather App",
    description: "Get current weather based on latitude and longitude",
    contact: {
      email: "merocastle@gmail.com",
      name: "Shikhar Subedi",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
    version: version,
  },
  servers: [
    {
      url: "http://localhost:3000/api/",
      description: "Weather app api",
    },
  ],
  tags: [
    {
      name: "HealthCheck",
    },
    {
      name: "CurrentWeather",
    },
  ],
  paths: {
    "/api/health-check": healthCheck,
    "/api/v1/weather": fetchCurrentWeather,
  },
  components: {
    schemas: {
      ApiResponse: {
        required: ["current", "lat", "lon", "timezone"],
        type: "object",
        properties: {
          lat: {
            maximum: 90,
            minimum: -90,
            type: "number",
            description: "latitude of location",
            example: 80.2,
          },
          lon: {
            maximum: 180,
            minimum: -180,
            type: "number",
            description: "longitude of location",
            example: -50.7,
          },
          timezone: {
            type: "string",
            description: "The timezone of the location",
            example: "America/New_York",
          },
          current: {
            $ref: "#/components/schemas/Current",
          },
          alerts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Alert",
            },
          },
        },
      },
      Current: {
        required: [
          "feelsLike",
          "temp",
          "tempDescription",
          "weatherDescription",
        ],
        type: "object",
        properties: {
          temp: {
            type: "number",
            description: "the current temperature in Fahrenheit",
            example: 75.8,
          },
          feelsLike: {
            type: "number",
            description: "what the temperature feels like in Fahrenheit",
            example: 80.8,
          },
          tempDescription: {
            type: "string",
            description:
              "a one word description of temperature based on the property feelsLike",
            example: "hot",
            enum: ["hot", "moderate", "cold"],
          },
          weatherDescription: {
            type: "string",
            description: "a description of the weather",
            example: "rainy and sunny",
          },
        },
      },
      Alert: {
        required: ["description", "end", "event", "start"],
        type: "object",
        properties: {
          start: {
            type: "string",
            description:
              "start date time string of the alert in the format\nyyyy-MM-dd HH:mm:ss zzz\nthe timezone is the locations timezone\n",
            format: "date-time",
            example: "2014-10-25 06:46:20 EST",
          },
          end: {
            type: "string",
            description:
              "end date time string of the alert in the format\nyyyy-MM-dd HH:mm:ss zzz\n in the locations timezone \n",
            format: "date-time",
            example: "2014-10-26 07:46:20 EST",
          },
          event: {
            type: "string",
            description: "a short description of the alert",
            example: "Small Craft Advisory",
          },
          description: {
            type: "string",
            description: "a long description of the alert",
            example: "Small Craft Advisory in effect from 5 pm",
          },
        },
      },

      inline_response_400: {
        required: ["message"],
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "validation error message",
            example: "lat is a required field",
          },
        },
      },
      inline_response_500: {
        required: ["message"],
        type: "object",
        properties: {
          message: {
            type: "string",
            enum: ["Server Error"],
            description: "Server Error",
            example: "Server Error",
          },
        },
      },
    },
  },
};
