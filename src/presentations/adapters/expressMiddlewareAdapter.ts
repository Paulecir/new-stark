/* eslint-disable dot-notation */
import { Request, Response, NextFunction } from "express"
import { IRequest } from "../interface/IRequest"
import { IMiddleware } from "../interface/IMiddleware"
import { IResponse } from "../interface/IResponse"

export const expressMiddlewareAdapter = (middleware: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IRequest = {
      headers: req.headers,
      cookies: req.cookies,
      query: req.query,
      params: req.params,
      body: req.body,
      user: req["user"],
    }

    const httpResponse = await middleware(httpRequest)
    if (httpResponse.status_code === 200) {
      Object.assign(req, httpResponse.data)
      next()
    } else {
      res.status(httpResponse.status_code).json({
        error: httpResponse.message
      })
    }
  }
}
