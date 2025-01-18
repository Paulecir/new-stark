import PrismaLocal from "@/infra/db/prisma";

export const getBinaryById = async ({ id, level = 10 }: any, Prisma = PrismaLocal) => {

    const root = await Prisma.strategyBinary.findFirst({
        where: {
            id: id
        },
        include: {
            user: true
        }
    });

    if (!root) {
        throw new Error('Binary not found');
    }

    const recursive = async (model, data, idx = 0) => {
        if (idx < level) {
            if (model.left_id) {
                const left = await Prisma.strategyBinary.findFirst({
                    where: {
                        id: model.left_id
                    },
                    include: {
                        user: true
                    }
                });

                if (left) {
                    Object.assign(data.children[0], {
                        name: left.user.name,
                        ...left,
                        children: [{ name: "" }, { name: "" }]
                    })

                    await recursive(Object.assign({}, left), data.children[0], idx + 1)
                } else {
                    data.children.push({
                        name: "",
                        children: [{ name: "" }, { name: "" }]
                    })
                }
            }

            if (model.right_id) {
                const right = await Prisma.strategyBinary.findFirst({
                    where: {
                        id: model.right_id
                    },
                    include: {
                        user: true
                    }
                });

                if (right) {
                    Object.assign(data.children[1], {
                        name: right.user.name,
                        ...right,
                        children: [{ name: "" }, { name: "" }]
                    })

                    await recursive(Object.assign({}, right), data.children[1], idx + 1)
                } else {
                    data.children.push({
                        name: "",
                        children: [{ name: "" }, { name: "" }]
                    })
                }
            }
        }
        return data
    }

    const extract = await recursive(root, {
        name: root.user.name,
        ...root,
        children: [{ name: "" }, { name: "" }]
    })

    return extract;

}