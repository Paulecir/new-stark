import Prisma from "@/infra/db/prisma";
import bcrypt from "bcrypt"

export const changePasswordUser = async (data: any) => {
    try {
        const u = await Prisma.user.updateMany({
            where: {
                remember_token: data.token
            },
            data: {
                remember_token: null,
                password: await bcrypt.hash(data.password, 12),
            },
        })
        const user = await Prisma.user.findFirst({
            where: {
                id: u[0].id
            },
            select: {
                id: true,
                email: true
            }
        })
        return user;
    } catch (err) {
        if (err.name === 'PrismaClientValidationError') {
            const msg = err.message.split("Unknown argument")[1].split(". Available")[0]
            throw new Error(`Unknow field ${msg}`)
        }
    }

}