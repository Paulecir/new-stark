import Prisma from "@/infra/db/prisma";

export const createProduct = async (data: any) => {
    try {
        const model = Prisma.$transaction(async (tx) => {
            const model = await tx.category.create({
                data: {
                    name: data.name,
                    direct_bonus: data.direct_bonus,
                    direct_bonus_levels: data.direct_bonus_levels,
                    unilevel_bonus: data.unilevel_bonus,
                    unilevel_bonus_levels: data.unilevel_bonus_levels,
                    residual_bonus: data.residual_bonus,
                    residual_bonus_levels: data.residual_bonus_levels,
                    binary_bonus: data.binary_bonus,
                    binary_bonus_levels: data.binary_bonus_levels
                },
            });

            for(const item of data.direct_bonus_levels || []) {
                await tx.categoryItem.create({
                    data: {
                        category_id: model.id,
                        type: "DIRECT",
                        max_value: item.max_value,
                        level_values: item.level_values
                    }
                })
            }

            for(const item of data.unilevel_bonus_levels || []) {
                await tx.categoryItem.create({
                    data: {
                        category_id: model.id,
                        type: "UNILEVER",
                        max_value: item.max_value,
                        level_values: item.level_values
                    }
                })
            }

            for(const item of data.residual_bonus_levels || []) {
                await tx.categoryItem.create({
                    data: {
                        category_id: model.id,
                        type: "RESIDUAL",
                        max_value: item.max_value,
                        level_values: item.level_values
                    }
                })
            }

            for(const item of data.binary_bonus_levels || []) {
                await tx.categoryItem.create({
                    data: {
                        category_id: model.id,
                        type: "BINARY",
                        max_value: item.max_value,
                        level_values: item.level_values
                    }
                })
            }

            return model;
        })

        return model;
    } catch (err) {
        console.log("E", err)
        return null
    }

}