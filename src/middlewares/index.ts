import { bodyParser, urlEncode } from "./bodyParser"
import methodOverride from "method-override"

import { cors } from "./cors"
import corsMid from "cors"
import { contentType } from "./contentType"
import { noCache } from "./no-cache"
import { Express } from "express"

import { cookieParser } from "./cookieParser"

export default (app: Express): void => {
  app.use(urlEncode)
  app.use(bodyParser)
  app.use(methodOverride())
  app.use(methodOverride("X-HTTP-Method")) //          Microsoft
  app.use(methodOverride("X-HTTP-Method-Override")) // Google/GData
  app.use(methodOverride("X-Method-Override")) //      IBM
  app.use(cors)

  const corsConfig = {
    origin: true,
    credentials: true
  }
  app.use(corsMid(corsConfig))
  app.options("*", corsMid(corsConfig))

  app.use(cookieParser)
  app.use(contentType)
  app.use(noCache)
}
