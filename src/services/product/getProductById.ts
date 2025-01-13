import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const getProductById = async (id: number) => {

    const data = await Prisma.product.findUnique({
        where: {
            id: id
        }

    })

    if (!data) throw new NotFoundError("Product not found")

    return data

}