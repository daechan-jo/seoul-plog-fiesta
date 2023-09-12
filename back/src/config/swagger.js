const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
  info: {
    title: 'Seoul plog fiesta API',
    description: '서울 플로깅 웹 서비슷 API 문서',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};
const outputFile = './src/config/swagger-output.json';
const endpointsFiles = ['./src/app.js'];
swaggerAutogen(outputFile, endpointsFiles, options);
