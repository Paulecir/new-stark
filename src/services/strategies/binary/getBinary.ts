import PrismaLocal from "@/infra/db/prisma";

export const getBinaryById = async ({ user, level = 20 }: any, Prisma = PrismaLocal) => {

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

}