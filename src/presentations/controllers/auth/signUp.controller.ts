import { JwtAdapter } from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"

export const signUpController = async (httpRequest: IRequest) => {

    try {
        if (httpRequest.body.email) httpRequest.body.email = httpRequest.body.email.toLowerCase()
        const { email, password, username, sponsor } = httpRequest.body


        let user = await Prisma.user.findFirst({
            where: {
                OR: [
                    { email: httpRequest.body.email },
                    { username: httpRequest.body.email }
                ]
            }
        })

        if (user) {
            HttpResponse.notCreate({
                code: 0x000001,
                key: "USER_FOUNT",
                message: "Este usuário já está cadastrado",
                error: {
                    email: "USER_FOUNT",
                    reference: "USER_FOUNT"
                }
            })

            return
        }

        let userFb = null
        const passwordHash = await bcrypt.hash(password, 10)

        let userSponsor = null
        if (sponsor) {
            userSponsor = await Prisma.user.findFirst({
                where: {
                    username: sponsor
                }
            })

            if (!userSponsor) {
                httpRequest.body.sponsor = null
            }
        } else {
            userSponsor = await Prisma.user.findFirst({
                where: {
                    id: 1
                }
            })
        }

        user = await Prisma.user.create({
            data: {
                name: httpRequest.body.name,
                username: httpRequest.body.username.toLowerCase(),
                email: httpRequest.body.email.toLowerCase(),
                sponsorId: userSponsor.id,
                password: passwordHash,
            }
        })

        return HttpResponse.ok({
            message: "OK", data: {
                user,
            }
        })
    } catch (error) {
        return HttpResponse.serverError(error)
    }
}