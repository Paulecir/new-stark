import { IRequest } from "../interface/IRequest"

/* eslint-disable dot-notation */
export const expressRouteAdapter = (controler: any) => {
  return async (req, res) => {
    const page = req.query.page || req.body?.pagination?.page
    const offset = req.query.offset || req.body?.pagination?.offset
    const limit = req.query.pageSize || req.query.limit || req.body?.pagination?.limit
    const __ref = req.query.__ref || req.body?.pagination?.__ref
    const ip = req.ip || req.connection.remoteAddress
    const userAgent = req.userAgent;

    delete req.query.page
    delete req.query.offset
    delete req.query.limit

    delete req.body.pagination

    const pagination = {
      page: 1,
      offset: 0,
      limit: 20,
      pageSize: 20
    }

    if (limit) {
      pagination.limit = Number.parseInt(limit as string)
      pagination.pageSize = Number.parseInt(limit as string)
    }

    if (offset) {
      pagination.offset = Number.parseInt(offset as string)
    }

    if (page) {
      pagination.page = Number.parseInt(page as string)
      pagination.offset = pagination.limit * (pagination.page - 1)
    } else if (offset) {
      pagination.page = Math.floor(pagination.offset / pagination.limit) + 1
    }

    const { user } = req as any

    if (__ref) {
      req.body.__ref = __ref
    }

    const appRequest: IRequest = {
      body: req.body,
      files: req.files,
      query: req.query,
      params: { ...req.params, app: req["appModel"] },
      headers: req.headers,
      args: Object.assign({}, req.body?.args || {}, req.query || {}),
      pagination,
      user,
      ip,
      userAgent
    }
    try {
      const appResponse = await controler(appRequest)
      if (appResponse.raw) {
        return res.status(appResponse.status_code).send(appResponse.data)
      }
      res.status(appResponse.status_code).send(appResponse)
    } catch (err) {
      const { message, name, stack, ...data } = err
      res.status(err.statusCode || 500).send({
        message,
        name,
        stack,
        ...{ ...data, error: undefined }
      })
    }
  }
}
