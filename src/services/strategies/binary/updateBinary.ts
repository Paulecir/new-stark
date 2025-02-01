import Prisma from "@/infra/db/prisma";

export const updateBinary = async (id: number, data: any) => {
    const first = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: id
        }
    })

    try {
        const modate = await Prisma.strategyBinary.updateMany({
            where: {
                user_id: first.id
            },
            data
        });

        return modate;
    } catch (err) {
        console.log("E", err)
        return null
    }

}