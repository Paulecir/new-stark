import { IRequest } from "./IRequest"
import { IResponse } from "./IResponse"

export interface IMiddleware {
  handle: (httpRequest: IRequest) => Promise<IResponse>
}
