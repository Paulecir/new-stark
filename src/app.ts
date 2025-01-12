import initMiddlewares from "@/middlewares"
import initRoutes from "@/routes"
import express, { Request, Response } from "express"
import http from "http"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';
import routes from 'routes';

const server = async () => {
  const app = express()

  const server = http.createServer(app)


  // Configuração do Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  console.log("?")
  // Rota de exemplo
  app.get('/api/v1/hello', (req, res) => {
    res.send({ message: 'Hello, world!' });
  });



  initMiddlewares(app)


  app.use("/download", express.static("download"))

  app.use(routes)

  return server
}

export default server()
