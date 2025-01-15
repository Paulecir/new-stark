import Prisma from "@/infra/db/prisma";

export const createProduct = async (data: any) => {
    try {
        const model = await Prisma.product.create({
            data: {
                name: data.name,
                description: data.description || null,
                price: data.price,
                direct_bonus: data.direct_bonus || false,
                direct_bonus_yield: data.direct_bonus_yield || 0,
                yield_type: data.yield_type || 'diary',
                yield: data.yield,
                unilevel_bonus: data.unilevel_bonus || false,
                unilevel_bonus_yield: JSON.stringify(data.unilevel_bonus_yield || [])
    
            },
        });
    
        return model;
    } catch (err) {
        console.log("E", err)
        return null
    }
   
}