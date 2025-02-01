import Prisma from "@/infra/db/prisma";

export const updateBinary = async (id: number, data: any) => {
    try {
        const modate = await Prisma.strategyBinary.update({
            where: {
                id
            },
            data
        });

        return modate;
    } catch (err) {
        console.log("E", err)
        return null
    }

}