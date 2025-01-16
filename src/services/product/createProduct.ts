import Prisma from "@/infra/db/prisma";

export const createProduct = async (data: any) => {
    const model = await Prisma.product.create({
        data
    });

    return model;


}