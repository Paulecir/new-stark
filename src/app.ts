import initMiddlewares from "@/middlewares";
import express from "express";
import http from "http";
import routes from 'routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/Stark.openapi.json';
import { initCronjob } from "./servers/cron";

// Carrega o arquivo YAML
// const swaggerDocument = YAML.load('./src/doc/swagger.yaml');

const server = async () => {
  const app = express()

  const server = http.createServer(app)

  // Configuração do Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  initMiddlewares(app)

  initCronjob()
  app.use("/download", express.static("download"))

  app.use(routes)

  return server
}

export default server()
