import Prisma from "@/infra/db/prisma";

export const updateBinary = async (id: number, data: any) => {
    try {
        const modate = await Prisma.strategyBinary.updateMany({
            where: {
                user_id: id
            },
            data
        });

        return modate;
    } catch (err) {
        console.log("E", err)
        return null
    }

}