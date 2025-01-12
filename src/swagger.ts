import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Minha API',
    description: 'Descrição da API usando Express e TypeScript',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles)