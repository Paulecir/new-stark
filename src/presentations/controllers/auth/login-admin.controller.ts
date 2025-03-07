import JwtAdapter from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import Sessions from "@/cache/Sessions"

export const loginAdminController = async (httpRequest: IRequest) => {

    try {

        if (!httpRequest.body.id) {
            return HttpResponse.notAuthorized({
                message: "ID_NOT_FOUND",
                error_code: "ID_NOT_FOUND"
            })
        }
    
        if (!httpRequest.user || httpRequest.user.profile !== "admin") {
            return HttpResponse.notAuthorized({
                message: "NOT_AUTHORIZED",
                error_code: "NOT_AUTHORIZED"
            })
            
        }

        let user = await Prisma.user.findFirst({
            where: {
                id: parseInt(httpRequest.body.id)
            },
            select: {
                id: true,
                login: true,
                password: true,
                sponsor: true,
                name: true,
                email: true,
                country_code: true,
                country_name: true,
                phone: true,
                profile: true,
                is_active: true
            }
        })

        if (!user) {
            return HttpResponse.notAuthorized({
                message: "USER_NOT_FOUND",
                error_code: "USER_NOT_FOUND"
            })

        }
        
        const accessToken = await JwtAdapter.encrypt(
            {
                id: user.id.toString(),
                "name": user.name.toString(),
                "login": user.login?.toString(),
                "email": user.email?.toString(),
                "phone": user.phone?.toString(),
                "country_code": user.country_code?.toString(),
                "country_name": user.country_name?.toString(),
                "profile": user.profile?.toString(),
                "position": null,
                "avatar": null,
                "sponsor_login": user.sponsor?.login || null,
                "sponsor_name": user.sponsor?.name || null,

            }, { expiresIn: '1h' }
        )

        await Sessions.set(accessToken, { ...user, userAgent: httpRequest.userAgent, ip: httpRequest.ip, latitude: httpRequest.body.latitude, longitude: httpRequest.body.longitude })

        return HttpResponse.successRawResponse({
            message: "OK",
            data: { token: accessToken },

        })
    } catch (error) {
        console.error("E", error)
        return HttpResponse.serverError(error)
    }
}