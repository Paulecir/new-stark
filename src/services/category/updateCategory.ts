import Prisma from "@/infra/db/prisma";

export const updateCategory = async (id: number, data: any) => {
    try {
        const modate = await Prisma.category.update({
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