import Prisma from "@/infra/db/prisma";

export const updateWithdraw = async (id: number, data: any) => {
    try {
        const modate = await Prisma.withdraw.update({
            where: {
                id
            },
            data
        });

        return modate;
    } catch (err) {
        console.error("E", err)
        return null
    }

}