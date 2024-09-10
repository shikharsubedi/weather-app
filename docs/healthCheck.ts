export const healthCheck = {
  tags: ['HealthCheck'],
  get: {
    summary: 'check health',
    description: 'get the current status of the weather app server',
    operationId: 'healthCheck',
    responses: {
      '200': {
        description: 'the server is running',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/inline_response_200',
            },
          },
        },
      },
    },
  },
};
