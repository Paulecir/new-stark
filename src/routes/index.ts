/* eslint-disable node/no-path-concat */
import { Express, Router } from "express"
import fg from "fast-glob"
import path from "path"

export default (app: Express): void => {
  const router = Router()
  app.use("/", router)
  const _check =
    process.env.NODE_ENV === "production"
      ? "**/routes/**/**.routes.js"
      : "**/routes/**/**.routes.ts"
  fg.sync(_check).map(async (file: string) => {
    try {
      const _path = path.basename(`@/../${file}`)
      const _uri = _path.split(".")[0]
      const innerRouter = Router()
      router.use(`/${_uri === "index" ? "" : _uri}`, innerRouter)
      ;(await import(`./${_path}`)).default(innerRouter)
      console.debug(`/${_path}`)
    } catch (err) {
      console.debug(err)
    }
  })
}
