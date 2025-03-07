import Prisma from "@/infra/db/prisma";

export const updateWallet = async (id: number, data: any) => {
    try {
        const modate = await Prisma.wallet.update({
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