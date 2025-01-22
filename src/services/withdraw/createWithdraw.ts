import Prisma from "@/infra/db/prisma";

export const createWithdraw = async (data: any) => {
    const model = await Prisma.withdraw.create({
        data
    });

    return model;


}