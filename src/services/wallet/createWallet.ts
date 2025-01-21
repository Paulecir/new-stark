import Prisma from "@/infra/db/prisma";

export const createWallet = async (data: any) => {
    const model = await Prisma.wallet.create({
        data
    });

    return model;


}