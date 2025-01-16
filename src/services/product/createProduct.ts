import Prisma from "@/infra/db/prisma";

export const createProduct = async (data: any) => {
    const model = await Prisma.product.create({
        data: {
            name: data.name,
            description: data.description || null,
            price: data.price,
            yield_type: data.yield_type || 'diary',
            yield: data.yield,

        },
    });

    return model;


}