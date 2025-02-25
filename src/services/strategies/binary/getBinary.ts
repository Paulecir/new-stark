import PrismaLocal from "@/infra/db/prisma";

export const getBinaryById = async ({ user, level = 1000 }: any, Prisma = PrismaLocal) => {

    const first = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: user.id
        }
    })

    let maxLevel = first.level + level

    const treeData = await Prisma.strategyBinary.findMany({
        where: {
            level: {
                gte: first.level,
                lte: maxLevel,
            },
            hier: { startsWith: first.hier },
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
    console.log(treeData.filter(f => !f.user))

    const addEmpty = []
    let _idx = 100000
    // Mapeando os dados para o formato necessário
    const formattedData = treeData.map((node, idx) => {
        let id = parseInt(`${(idx * 1000)}node.id`)

        const axs: any = treeData.filter((f: any) => f.parent_id === node.id)

        if (axs.length === 0) {
            addEmpty.push({
                id: _idx++,
                level: node.level - first.level + 1, // Subtraindo o nível da raiz
                name: "Vazio", // Nome do usuário
                avatar: "", // Caso tenha avatar, pode ser adicionado
                points: 0, // Substitua por um cálculo real se necessário
                parentId: node.id,
                handle: "left", // Definindo handle com base em 'ref'
            })

            addEmpty.push({
                id: _idx++,
                level: node.level - first.level + 1, // Subtraindo o nível da raiz
                name: "Vazio", // Nome do usuário
                avatar: "", // Caso tenha avatar, pode ser adicionado
                points: 0, // Substitua por um cálculo real se necessário
                parentId: node.id,
                handle: "right", // Definindo handle com base em 'ref'
            })
        }

         if (axs.length === 1) {
            addEmpty.push({
                id: _idx++,
                level: node.level - first.level + 1, // Subtraindo o nível da raiz
                name: "Vazio", // Nome do usuário
                avatar: "", // Caso tenha avatar, pode ser adicionado
                points: 0, // Substitua por um cálculo real se necessário
                parentId: node.id,
                handle: axs[0].handle === "left" ? "right" : "left", // Definindo handle com base em 'ref'
            })

        }

        return {
            id: node.id,
            level: node.level - first.level, // Subtraindo o nível da raiz
            name: node.user.name, // Nome do usuário
            avatar: "", // Caso tenha avatar, pode ser adicionado
            points: 0, // Substitua por um cálculo real se necessário
            parentId: node.parent_id,
            handle: node.ref === "L" ? "left" : "right", // Definindo handle com base em 'ref'
        }
    });

    return [...formattedData, ...addEmpty];

}