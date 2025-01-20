import PrismaLocal from "@/infra/db/prisma";

export const updateCategory = async (id: number, data: any, Prisma = PrismaLocal) => {

    const binary_bonus_items = data.binary_bonus_items
    const unilevel_bonus_items = data.unilevel_bonus_items
    const residual_bonus_items = data.residual_bonus_items

    delete data.binary_bonus_items
    delete data.unilevel_bonus_items
    delete data.residual_bonus_items

    const model = await Prisma.category.update({
        where: {
            id
        },
        data
    })
    
    for (const unilevel of unilevel_bonus_items) {
        if (unilevel.id) {
            await Prisma.categoryItem.update({
                where: {
                    id: unilevel.id
                },
                data: {
                    max_value: unilevel.max_value,
                    level_values: unilevel.level_values
                }
            })
        } else {
            const cat = await Prisma.categoryItem.create({
                data: {
                    category_id: model.id,
                    type: "UNILEVEL",
                    max_value: unilevel.max_value,
                    level_values: unilevel.level_values
                }
            })
        }
    }

    for (const bonus of residual_bonus_items) {
        if (bonus.id) {
            await Prisma.categoryItem.update({
                where: {
                    id: bonus.id
                },
                data: {
                    max_value: bonus.max_value,
                    level_values: bonus.level_values
                }
            })
        } else {
            const cat = await Prisma.categoryItem.create({
                data: {
                    category_id: model.id,
                    type: "RESIDUAL",
                    max_value: bonus.max_value,
                    level_values: bonus.level_values
                }
            })
        }
    }

    for (const bonus of binary_bonus_items) {
        if (bonus.id) {
            await Prisma.categoryItem.update({
                where: {
                    id: bonus.id
                },
                data: {
                    max_value: bonus.max_value,
                    level_values: bonus.level_values
                }
            })
        } else {
            const cat = await Prisma.categoryItem.create({
                data: {
                    category_id: model.id,
                    type: "BINARY",
                    max_value: bonus.max_value,
                    level_values: bonus.level_values
                }
            })
        }
    }

    return model;

}