import dotenv from "dotenv"
import moment from "moment-timezone";

dotenv.config()

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

moment.tz.setDefault("America/Sao_Paulo")

process.on('uncaughtException', err => {
  console.log(err);
});

;(async () => {
  // await swaggerAutogen()(outputFile, endpointsFiles)
  const server = await (await import("@/app")).default

  const port = process.env.PORT || 3000
  server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`)
  })
})()
