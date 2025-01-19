import PrismaLocal from "@/infra/db/prisma";

export const getBinaryById = async ({ id, level = 10 }: any, Prisma = PrismaLocal) => {

    const first = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: id
        }
    })

    let maxLevel = first.level + level

    const treeData = await Prisma.strategyBinary.findMany({
        where: {
            level: {
                gte: first.level,
                lte: maxLevel,
            },
            hier: { startsWith: first.hier }
        },
        include: {
            user: {
                select: {
                    name: true, // Pegando o campo 'name' da tabela User
                },
            },
        },
        orderBy: [{
            level: 'asc',
        },
        {
            ref: 'asc'
        }]
    });

    // Mapeando os dados para o formato necessário
    const formattedData = treeData.map((node) => ({
        id: node.id,
        level: node.level - first.level, // Subtraindo o nível da raiz
        name: node.user.name, // Nome do usuário
        avatar: "", // Caso tenha avatar, pode ser adicionado
        points: 0, // Substitua por um cálculo real se necessário
        parentId: node.parent_id,
        handle: node.ref === "L" ? "left" : "right", // Definindo handle com base em 'ref'
    }));

    return formattedData;


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
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                login: true
                            }

                        }
                    }
                });

                if (left) {
                    Object.assign(data.children[0], {
                        name: left.user.name,
                        // attributes: left,
                        collapsed: true,
                        children: [{ name: "" }, { name: "" }]
                    })

                    await recursive(Object.assign({}, left), data.children[0], idx + 1)
                } else {
                    data.children.push({
                        name: "",
                        collapsed: true,
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
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                login: true
                            }

                        }
                    }
                });

                if (right) {
                    Object.assign(data.children[1], {
                        name: right.user.name,
                        // attributes: right,
                        collapsed: true,
                        children: [{ name: "" }, { name: "" }]
                    })

                    await recursive(Object.assign({}, right), data.children[1], idx + 1)
                } else {
                    data.children.push({
                        name: "",
                        collapsed: true,
                        children: [{ name: "" }, { name: "" }]
                    })
                }
            }
        }
        return data
    }

    const extract = await recursive(root, {
        name: root.user.name,
        // attributes: root,
        collapsed: false,
        children: [{ name: "" }, { name: "" }]
    })

    return extract;

}