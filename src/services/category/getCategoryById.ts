import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const getCategoryById = async (id: number) => {

    const data = await Prisma.category.findUnique({
        where: {
            id: id
        },
        include: {
            CategoryItem: true
        }

    })

    if (!data) throw new NotFoundError("Product not found")
        
    return {
        ...data,
        CategoryItem: undefined,
        direct_bonus_items: data.CategoryItem.filter(item => item.type === "DIRECT"),
        unilever_bonus_items: data.CategoryItem.filter(item => item.type === "UNILEVER"),
        residual_bonus_items: data.CategoryItem.filter(item => item.type === "RESIDUAL"),
        binary_bonus_items: data.CategoryItem.filter(item => item.type === "BINARY"),
    }

}