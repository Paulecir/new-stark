import Prisma from "@/infra/db/prisma";

export const updateProduct = async (id: number, data: any) => {
    try {
        const modate = await Prisma.product.update({
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