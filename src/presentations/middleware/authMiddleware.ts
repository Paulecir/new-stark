import Sessions from "@/cache/Sessions";
import { HttpResponse } from "../helpers/httpResponse";
import { IRequest } from "../interface/IRequest";
import { IResponse } from "../interface/IResponse";
import JwtAdapter from "@/infra/criptography/jwt-adapter";
import Prisma from "@/infra/db/prisma";

export const makeAuthMiddleware = async (httpRequest: IRequest): Promise<IResponse> => {

    let accessToken = (
        httpRequest.headers?.authorization ||
        httpRequest.headers?.Authorization ||
        httpRequest.headers?.["x-jwt-token"] ||
        httpRequest.cookies?.accessToken
    )?.replace("Bearer ", "")


    if (!accessToken) {
        return HttpResponse.validationError("accessToken")
    }
    let session = await Sessions.get(accessToken)
    let user = null
    if (!session) {
        const dec: any = await JwtAdapter.decrypt(accessToken)

        user = await Prisma.user.findFirst({
            where: { login: dec.login || dec.username || dec.email }
        })

        session = await Sessions.set(accessToken, user)
    }

    return HttpResponse.successRawResponse({
        data: {
            session,
            user
        }
    })
}