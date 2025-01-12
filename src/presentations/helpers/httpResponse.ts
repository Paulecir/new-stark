import { NotAuthorizedError } from "../errors/notAuthorizedError"
import { ServerError } from "../errors/serverError"
import { IResponse } from "../interface/IResponse"

export const ok = ({ data, message, raw = false }): IResponse => {
    return {
        status: "success",
        status_code: 200,
        message,
        data,
        raw
    }
}

export const successResponse = ({ data, metadata = undefined, message = "", status = 200}): IResponse => {
    return {
        status: "success",
        status_code: status,
        message,
        data,
        metadata
    }
}

export const create = ({ data, message }): IResponse => {
    return {
        status: "success",
        status_code: 201,
        message,
        data,
    }
}

// export const status = (data: any, statusCode?: any): IResponse => {
//     return {
//         statusCode,
//         body: data
//     }
// }

export const serverError = (error: Error): IResponse => ({
    status: "Server Error",
    status_code: 500,
    message: "Internal server error",
    data: new ServerError(error.stack, error)
})

// export const forbidden = (paramName): IResponse => ({
//     statusCode: 403,
//     body: new ForbidenError(paramName)
// })

export const notAuthorized = (paramName, data = null): IResponse => ({
    status: "Not Authorized",
    status_code: 401,
    message: "",
    data: new NotAuthorizedError(paramName, data)
})

export const notCreate = (paramName, data = null): IResponse => ({
    status: "Not Create",
    status_code: 400,
    message: "",
    data: new NotAuthorizedError(paramName, data)
})

// export const notFound = (data: any): IResponse => ({
//     statusCode: 404,
//     body: new NotFoundError(data)
// })


export const HttpResponse = {
    ok,
    successResponse,
    create,
    serverError,
    notAuthorized,
    notCreate
    // serverError,
    // notPermited,
    // notFound,
    // forbidden,
    // status
}

