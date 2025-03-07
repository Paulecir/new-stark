import PrismaLocal from "@/infra/db/prisma";

export const updateScheduler = async (id: number, data: any, Prisma = PrismaLocal) => {
    try {
        const modate = await Prisma.commissionScheduler.update({
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