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
        console.log("E", err)
        return null
    }

}