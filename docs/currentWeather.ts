export const fetchCurrentWeather = {
  tags: ['CurrentWeather'],
  get: {
    summary: 'fetch current weather',
    description: 'fetch current weather based on latitude and longitude\n',
    parameters: [
      {
        name: 'lat',
        in: 'query',
        description: 'latitude of the location',
        required: true,
        style: 'form',
        explode: true,
        schema: {
          maximum: 90,
          minimum: -90,
          type: 'number',
          format: 'string',
        },
      },
      {
        name: 'lon',
        in: 'query',
        description: 'longitude of the location',
        required: true,
        style: 'form',
        explode: true,
        schema: {
          maximum: 180,
          minimum: -180,
          type: 'number',
          format: 'string',
        },
      },
    ],
    responses: {
      '200': {
        description: 'weather info fetched',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ApiResponse',
            },
          },
        },
      },
      '400': {
        description: 'invalid input',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/inline_response_400',
            },
          },
        },
      },
      '500': {
        description: 'Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/inline_response_500',
            },
          },
        },
      },
    },
  },
};
