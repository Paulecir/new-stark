import initMiddlewares from "@/middlewares"
import initRoutes from "@/routes"
import express from "express"
import http from "http"

const server = async () => {
  const app = express()

  const server = http.createServer(app)


  initMiddlewares(app)
  app.use("/download", express.static("download"))

  initRoutes(app)
  
  return server
}

export default server()
